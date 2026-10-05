import { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, TextField, Typography, Paper, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <LockOutlinedIcon color="primary" />
          <Typography component="h1" variant="h5">
            Log in to application
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            slotProps={{ htmlInput: { 'data-testid': 'username' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            slotProps={{ htmlInput: { 'data-testid': 'password' } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            id="login-button"
            data-testid="login-button"
            sx={{ mt: 3, mb: 2 }}
          >
            login
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
