const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => {
    return (current.likes || 0) > (prev.likes || 0) ? current : prev
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const blogCounts = {}
  blogs.forEach((blog) => {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
  })

  let maxAuthor = null
  let maxCount = -1

  for (const [author, count] of Object.entries(blogCounts)) {
    if (count > maxCount) {
      maxCount = count
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    blogs: maxCount,
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const likeCounts = {}
  blogs.forEach((blog) => {
    likeCounts[blog.author] = (likeCounts[blog.author] || 0) + (blog.likes || 0)
  })

  let maxAuthor = null
  let maxLikes = -1

  for (const [author, likes] of Object.entries(likeCounts)) {
    if (likes > maxLikes) {
      maxLikes = likes
      maxAuthor = author
    }
  }

  return {
    author: maxAuthor,
    likes: maxLikes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
