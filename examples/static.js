var winston = require('winston')
var winstonWrapper = require('../index.js')

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
})

logger = winstonWrapper(logger)

logger.addMeta({
  test: 'Test Meta'
})

logger.info('test message')
