import { logger } from 'react-native-logs';

const shLogger = logger.createLogger({
  levels: {
    custom: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    devNotice: 5,
  },
  severity: 'info',
  transportOptions: {
    colors: {
      custom: 'white',
      devNotice: 'blue',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'white',
    },
  },
});

export default shLogger;
