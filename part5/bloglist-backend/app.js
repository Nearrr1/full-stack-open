const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

mongoose.set('strictQuery', false)

if (config.MONGODB_URI) {
  logger.info('connecting to', config.MONGODB_URI)
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
} else {
  const { MongoMemoryServer } = require('mongodb-memory-server')
  MongoMemoryServer.create({
    downloadDir: '.cache/mongodb-binaries'
  }).then((server) => {
    return mongoose.connect(server.getUri())
  }).then(() => {
    logger.info('connected to in-memory MongoDB')
  }).catch((error) => {
    logger.error('error connecting to in-memory MongoDB:', error.message)
  })
}

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
