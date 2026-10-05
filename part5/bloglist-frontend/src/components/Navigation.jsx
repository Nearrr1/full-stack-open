import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const Navigation = ({ user, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <BookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ mr: 3, fontWeight: 700 }}>
          Blog App
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            data-testid="nav-blogs"
          >
            blogs
          </Button>
          {user && (
            <Button
              color="inherit"
              component={RouterLink}
              to="/create"
              data-testid="nav-create"
            >
              create new
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Typography variant="body2" sx={{ fontStyle: 'italic' }} data-testid="user-info">
                {user.name} logged in
              </Typography>
              <Button
                color="secondary"
                variant="contained"
                size="small"
                onClick={onLogout}
                data-testid="logout-button"
              >
                logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              data-testid="nav-login"
            >
              login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Navigation.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    token: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
}

export default Navigation
