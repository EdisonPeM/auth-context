const log = true;

const logger = {
  log: (...args) => log && console.log(...args),
  logDate: (date) => log && console.log(date.toLocaleString()),
  info: (...args) => log && console.info(...args),
  warn: (...args) => log && console.warn(...args),
  error: (...args) => log && console.error(...args),
  time: (timeId) => log && console.time(timeId),
  timeEnd: (timeId) => log && console.timeEnd(timeId)
};

export default logger;
