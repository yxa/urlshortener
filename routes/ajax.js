var winston     = require('../winston'),
    _           = require('underscore'),
    async       = require('async'),
    redisConfig = require('../config/redis_keys'),
    routes      = require('../config/routes');

var keys        = redisConfig.redis.keys;
var redisLimits = redisConfig.redis.limits;
var db;

module.exports = function(app,redis) {
  //all ajax routes should have a content type of application/json
  app.all(routes.ajaxRoutePrefix + '*', function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  db = redis;

  app.get(routes.newShortsUrl,newUrls);
  app.get(routes.totalCountUrl, totalCount);
};

var newUrls = function newUrls(req, res) {
  db.lrange(keys.newUrls, 0, redisLimits.maxUrlsInMemory - 1, function(err, reply){
    async.map(reply, function(uri, cb) {
      var key = keys.urlPrefix + uri;
      db.hgetall(key, cb);
    }, function(err, list) {
      res.json(list.map(function(elm) {return {"path": elm.url} }));
    });
  });
};

var totalCount = function totalCount(req, res) {
  db.get(keys.totalCount,function(err, reply) {
    if(reply) {
      res.send(JSON.stringify({totalCount: reply}));
    } else {
      res.send(JSON.stringify({totalCount: 0}));
    }
  });
};
