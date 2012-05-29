var config = config || {};

config.redis = config.redis || {};

config.redis.keys = {
  newUrls: "newurls",
  totalCount: "stats:urls",
  urlPrefix: "urls:",
  generateUrlPostfixKey: function() {
    return Math.random().toString(36).substr(2, 5);
  }
};

config.redis.limits = {
  totalUrlsInMemory: 10
}


module.exports = config;
