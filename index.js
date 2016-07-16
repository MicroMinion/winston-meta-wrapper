'use strict'

var _ = require('lodash')
var extend = require('extend.js')

const formatRegExp = /%[sdj]/g

var wrapper = function (logger) {
  var self = this
  var newLogger = {}

  _.each(_.functions(logger), function (funcName) {
    newLogger[funcName] = function () {
      var meta = newLogger.getMeta()
      var fmtMatch = arguments[0] && arguments[0].match && arguments[0].match(formatRegExp)
      var formatArguments = fmtMatch ? fmtMatch.length : 0
      if (_.isObject(arguments[formatArguments + 1])) {
        arguments[formatArguments + 1] = extend(meta, arguments[formatArguments + 1])
      } else {
        arguments.splice(formatArguments + 1, 0, meta)
      }
      logger[funcName].apply(logger, arguments)
    }
  })

  newLogger.addMeta = function (meta) {
    if (!this.meta) {
      this.meta = {}
    }
    this.meta = extend(this.meta, meta)
  }

  newLogger.getMeta = function () {
    if (!this.meta) {
      return {}
    } else {
      return this.meta
    }
  }

  return newLogger
}

module.exports = wrapper
