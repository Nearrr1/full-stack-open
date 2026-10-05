import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <NoteAddIcon color="primary" />
          <Typography component="h2" variant="h5">
            create new blog
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            placeholder="write blog title here"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            slotProps={{ htmlInput: { 'data-testid': 'title-input' } }}
          />
          <TextField
            margin="normal"
            fullWidth
            id="author"
            label="Author"
            name="author"
            placeholder="write blog author here"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            slotProps={{ htmlInput: { 'data-testid': 'author-input' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="url"
            label="URL"
            name="url"
            placeholder="write blog url here"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            slotProps={{ htmlInput: { 'data-testid': 'url-input' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            id="create-button"
            data-testid="create-blog-button"
            sx={{ mt: 3, mb: 1 }}
          >
            create
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
