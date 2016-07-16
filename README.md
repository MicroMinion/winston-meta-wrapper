# winston-meta-wrapper
Wraps winston logger instance to always add a set of metadata

This wrapper around winston loggers allows you to log a static or dynamic set of metadata with each log statement being executed without explicitely adding it as meta argument.

It also fixes the [JSON string interpolation issue in winston](https://github.com/winstonjs/winston/issues/745)

## Installation

```js
npm install winston-meta-wrapper
```

## Usage

### Wrapping Winston Logger to add static metadata

```js
var winston = require('winston')
var winstonWrapper = require('winston-meta-wrapper')

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
```

### Wrapping Winston Logger to add dynamic metadata

```js
var winston = require('winston')
var winstonWrapper = require('winston-meta-wrapper')

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
```

### Chaining wrapped Winston Loggers

```js
var winston = require('winston')
var winstonWrapper = require('winston-meta-wrapper')

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console()
  ]
})

logger = winstonWrapper(logger)

logger.addMeta({
  test: 'Test Meta'
})

logger = winstonWrapper(logger)

logger.addMeta({
  test2: 'Test 2 Meta'
})

logger.info('test message')
```
