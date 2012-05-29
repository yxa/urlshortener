var config = config || {};
    config.log = config.log || {};

config.log.prefixes = {
  urlPrefix: "URL",
  ipPrefix: "IP",
  kvString: function(key, value) {
    return key + ":" + value;
  }
};

module.exports = config;

