import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => (b.likes || 0) - (a.likes || 0))

  return (
    <Box sx={{ mt: 3 }} data-testid="blog-list">
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table aria-label="blog list table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Author</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow
                key={blog.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="blog-item"
                data-testid={`blog-item-${blog.id}`}
              >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}
                    data-testid={`blog-link-${blog.id}`}
                  >
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell align="right" data-testid={`blog-item-likes-${blog.id}`}>{blog.likes || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      likes: PropTypes.number,
    })
  ).isRequired,
}

export default BlogList
