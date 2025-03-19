const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json() // Logs in JSON format
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),

    // Daily log rotation setup
    new DailyRotateFile({
      filename: 'logs/session-%DATE%.log', // Log files named based on date
      datePattern: 'YYYY-MM-DD', // Each log file will have the current date
      maxSize: '10m', // Max file size 10MB (prevents massive log files)
      maxFiles: '14d' // Keep logs for 14 days, then delete old logs
    })
  ]
});

module.exports = logger;
