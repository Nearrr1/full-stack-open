const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

let mongoServer
let token
let testUser

before(async () => {
  if (mongoose.connection.readyState === 0) {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  testUser = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash,
  })
  await testUser.save()

  const userForToken = {
    username: testUser.username,
    id: testUser._id,
  }
  token = jwt.sign(userForToken, config.SECRET)

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: testUser._id })
  )
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data and valid token', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    assert.ok(titles.includes('Canonical string reduction'))
  })

  test('fails with status 401 Unauthorized if token is not provided', async () => {
    const newBlog = {
      title: 'Blog without token',
      author: 'Anonymous',
      url: 'http://example.com/notoken',
      likes: 1,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Async/Await patterns',
      author: 'Dan Abramov',
      url: 'https://overreacted.io/',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find((b) => b.title === 'Async/Await patterns')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('fails with status 400 if title is missing', async () => {
    const newBlog = {
      author: 'Unknown Author',
      url: 'https://example.com/no-title',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('fails with status 400 if url is missing', async () => {
    const newBlog = {
      title: 'Blog without URL',
      author: 'Unknown Author',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid and user is creator', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const ids = blogsAtEnd.map((b) => b.id)
    assert.ok(!ids.includes(blogToDelete.id))
  })

  test('fails with status 401 if unauthorized user attempts deletion', async () => {
    const passwordHash = await bcrypt.hash('secret2', 10)
    const anotherUser = new User({
      username: 'another',
      name: 'Another User',
      passwordHash,
    })
    await anotherUser.save()
    const otherToken = jwt.sign(
      { username: anotherUser.username, id: anotherUser._id },
      config.SECRET
    )

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

describe('updating a blog', () => {
  test('succeeds with status 200 and updates likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 10,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedInDb = blogsAtEnd.find((b) => b.id === blogToUpdate.id)
    assert.strictEqual(updatedInDb.likes, blogToUpdate.likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
  if (mongoServer) {
    await mongoServer.stop()
  }
})
