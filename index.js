'use strict'

var _ = require('lodash')
var extend = require('extend.js')

const formatRegExp = /%[sdj]/g

var wrapper = function (logger) {
  var self = this
  var newLogger = {}

  _.each(_.functions(logger), function (funcName) {
    newLogger[funcName] = function () {
      var args = Array.prototype.slice.call(arguments)
      var meta = newLogger.getMeta()
      var fmtMatch = args[0] && args[0].match && args[0].match(formatRegExp)
      var formatArguments = fmtMatch ? fmtMatch.length : 0
      if (_.isObject(args[formatArguments + 1])) {
        args[formatArguments + 1] = extend(meta, args[formatArguments + 1])
      } else {
        args.splice(formatArguments + 1, 0, meta)
      }
      logger[funcName].apply(logger, args)
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
