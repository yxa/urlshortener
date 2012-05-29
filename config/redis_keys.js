var config = config || {};

config.redis = config.redis || {};

config.redis.keys = {
  newUrls: "newurls",
  totalCount: "stats:urls",
  urlPrefix: "urls:",
  generateUrlPostfixKey: function() {
    //36 specifies the base / radix for representing numeric values
    //just stolen from stackoverflow, should probably look into these things
    //if this code should go into production
    return Math.random().toString(36).substr(2, 5);
  }
};

config.redis.limits = {
  maxUrlsInMemory: 10
}


module.exports = config;
