var winston = require('winston');

//security
winston.loggers.add('security', {
  console: {
    level: 'info',
    colorize: 'true'
  },
  file: {
    filename: './logs/security.log'
  }
});

//general
winston.loggers.add('general', {
  console: {
    level: 'info',
    colorize: 'true'
  },
  file: {
    filename: './logs/general.log'
  }
});

//general
winston.loggers.add('warnings', {
  console: {
    level: 'warn',
    colorize: 'true'
  },
  file: {
    filename: './logs/warnings.log'
  }
});
var warning = winston.loggers.get('warnings');
var security = winston.loggers.get('security');
var general = winston.loggers.get('general');

exports.general = function(msg,meta) {
  general.info(msg,meta);
};

exports.security = function(msg,meta) {
  security.warn(msg,meta);
};

exports.warning = function(msg,meta) {
  warning.warn(msg,meta);
};
