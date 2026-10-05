import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box sx={{ my: 2 }}>
      <Box style={hideWhenVisible}>
        <Button variant="contained" onClick={toggleVisibility} data-testid="togglable-button">
          {props.buttonLabel}
        </Button>
      </Box>
      <Box style={showWhenVisible} className="togglableContent">
        {props.children}
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={toggleVisibility}>
            cancel
          </Button>
        </Box>
      </Box>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Togglable
