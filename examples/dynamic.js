var winston = require('winston')
var winstonWrapper = require('../index.js')

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
})

logger = winstonWrapper(logger)

logger.getMeta = function () {
  return {
    module: Math.random()
  }
}

logger.info('test message')
logger.info('test message')
