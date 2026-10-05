import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useMatch, Navigate } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'

import Blog from './components/Blog'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      notify(`welcome back, ${loggedUser.name || loggedUser.username}!`)
      navigate('/')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    notify('logged out successfully')
    navigate('/')
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      notify(`a new blog '${newBlog.title}' by ${newBlog.author || 'unknown'} added`)
      navigate('/')
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'failed to add blog'
      notify(errorMsg, 'error')
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: (blog.likes || 0) + 1,
        user: blog.user?.id || blog.user?._id || blog.user,
      }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)))
      notify(`you liked '${returnedBlog.title}'`)
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'failed to update likes'
      notify(errorMsg, 'error')
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      notify(`blog '${blog.title}' was successfully removed`)
      navigate('/')
    } catch (exception) {
      const errorMsg = exception.response?.data?.error || 'failed to delete blog'
      notify(errorMsg, 'error')
    }
  }

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation user={user} onLogout={handleLogout} />
      <Container maxWidth="md" sx={{ mt: 3, mb: 5 }}>
        <Notification notification={notification} />

        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route
            path="/login"
            element={user ? <Navigate replace to="/" /> : <LoginForm onLogin={handleLogin} />}
          />
          <Route
            path="/create"
            element={user ? <BlogForm createBlog={handleCreateBlog} /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/blogs/:id"
            element={
              matchedBlog ? (
                <Blog
                  blog={matchedBlog}
                  user={user}
                  handleLike={handleLike}
                  handleDelete={handleDelete}
                />
              ) : (
                <p>Blog not found</p>
              )
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App