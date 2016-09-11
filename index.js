'use strict'

var _ = require('lodash')

var formatRegExp = /%[sdj]/g

var wrapper = function (logger) {
  return new WinstonMetaWrapper(logger)
}

var WinstonMetaWrapper = function (logger) {
  this._meta = {}
  this._logger = logger
  this._filters = {}
}

WinstonMetaWrapper.prototype.log = function () {
  var args = Array.prototype.slice.call(arguments)
  var fmtMatch = args[1] && args[1].match && args[1].match(formatRegExp)
  var formatArguments = fmtMatch ? fmtMatch.length : 0
  if (_.isObject(args[formatArguments + 2])) {
    var meta = _.cloneDeep(this._meta)
    _.merge(meta, args[formatArguments + 2])
    args[formatArguments + 2] = meta
  } else {
    args.splice(formatArguments + 2, 0, _.cloneDeep(this._meta))
  }
  if (this.filterApplies(args[formatArguments + 2])) {
    this._logger.log.apply(this._logger, args)
  }
}

WinstonMetaWrapper.prototype.filterApplies = function (metaArgs) {
  return _.every(this._filters, function (regex, key) {
    var r = new RegExp(regex)
    if (_.has(metaArgs, key)) {
      return r.test(metaArgs[key])
    } else {
      return true
    }
  })
}

WinstonMetaWrapper.prototype.error = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('error')
  this.log.apply(this, args)
}

WinstonMetaWrapper.prototype.warn = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('warn')
  this.log.apply(this, args)
}
WinstonMetaWrapper.prototype.info = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('info')
  this.log.apply(this, args)
}
WinstonMetaWrapper.prototype.verbose = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('verbose')
  this.log.apply(this, args)
}
WinstonMetaWrapper.prototype.debug = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('debug')
  this.log.apply(this, args)
}
WinstonMetaWrapper.prototype.silly = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift('silly')
  this.log.apply(this, args)
}

WinstonMetaWrapper.prototype.setFilter = function (key, filterRegEx) {
  this._filters[key] = filterRegEx
}

WinstonMetaWrapper.prototype.addMeta = function (meta) {
  _.merge(this._meta, meta)
}

module.exports = wrapper
