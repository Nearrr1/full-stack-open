const Notification = ({ notification, message, type }) => {
  const currentMessage = notification ? notification.message : message
  const currentType = notification ? notification.type : (type || 'success')

  if (!currentMessage) {
    return null
  }

  const statusClass = currentType === 'error' ? 'error' : 'success'

  return (
    <div className={`notification ${statusClass}`}>
      {currentMessage}
    </div>
  )
}

export default Notification
