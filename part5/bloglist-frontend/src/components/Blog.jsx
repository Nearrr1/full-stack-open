import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Link as MuiLink,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  if (!blog) {
    return null
  }

  const blogCreatorUsername = blog.user?.username || (typeof blog.user === 'string' ? blog.user : null)
  const isCreator = Boolean(user && blogCreatorUsername && user.username === blogCreatorUsername)

  const onLike = () => {
    if (handleLike) {
      handleLike(blog)
    }
  }

  const onDelete = () => {
    if (handleDelete) {
      const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
      if (ok) {
        handleDelete(blog)
      }
    }
  }

  return (
    <Card
      elevation={3}
      sx={{ my: 2, p: 1 }}
      className="blog"
      data-testid="blog-details"
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom data-testid="blog-title">
          {blog.title} {blog.author}
        </Typography>

        <Typography variant="body1" sx={{ my: 1 }} data-testid="blog-url">
          <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </MuiLink>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }} data-testid="blog-likes">
          <Typography variant="body1">
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
          </Typography>
          {user && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<ThumbUpIcon />}
              onClick={onLike}
              data-testid="like-button"
            >
              like
            </Button>
          )}
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} data-testid="blog-user">
          added by {blog.user?.name || blog.user?.username || blogCreatorUsername || 'anonymous'}
        </Typography>
      </CardContent>

      {user && isCreator && (
        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            data-testid="delete-button"
          >
            remove
          </Button>
        </CardActions>
      )}
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        name: PropTypes.string,
      }),
    ]),
  }),
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
  }),
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
}

export default Blog