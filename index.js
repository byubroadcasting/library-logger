const winston = require('winston')

const levels = [
  'debug',
  'info',
  'warn',
  'error'
]

const DEFAULT_LOG_LEVEL = 'error'

const logPrefix = () => {
  return process.env.LOG_PREFIX ? `${process.env.LOG_PREFIX}: ` : ''
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  exitOnError: false,
  format: format.combine(
    format.align(),
    format.printf(info => `${logPrefix()}${info.level}: ${info.message}`)
  )
})

const setLogLevel = (logLevel) => {
  if (levels.includes(logLevel)) {
    process.env.LOG_LEVEL = logLevel
  }
}

const setLogPrefix = (logPrefix) => {
  process.env.LOG_PREFIX = logPrefix || ''
}

const wrapFunction = (logFunction, ...args) => {
  logger.level = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL
  logFunction(...args)
}

const log = {
  debug: (...args) => wrapFunction(logger.debug, ...args),
  info: (...args) => wrapFunction(logger.info, ...args),
  warn: (...args) => wrapFunction(logger.warn, ...args),
  error: (...args) => wrapFunction(logger.error, ...args)
}

module.exports = {
  log,
  setLogLevel,
  setLogPrefix
}