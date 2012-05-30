var winston     = require('../winston'),
    _           = require('underscore'),
    async       = require('async'),
    redisConfig = require('../config/redis_keys'),
    routes      = require('../config/routes');

var keys        = redisConfig.redis.keys;
var redisLimits = redisConfig.redis.limits;

module.exports = function(app) {
  //all ajax routes should have a content type of application/json
  app.all(routes.ajaxRoutePrefix + '*', function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  app.get(routes.newShortsUrl,newUrls);
  app.get(routes.totalCountUrl, totalCount);
};

var newUrls = function newUrls(req, res) {
  redis.lrange(keys.newUrls, 0, redisLimits.maxUrlsInMemory, function(err, reply){
    async.map(reply, function(uri, cb) {
      var key = keys.urlPrefix + uri;
      redis.hgetall(key, cb);
    }, function(err, list) {
      res.json(list.map(function(elm) {return {"path": elm.url} }));
    });


    /*
    var list = [];
    var size = reply.length;

    var insert = function insert(err,reply){
      size--;
      list.push(reply.url);
      if(size === 0) {
        res.send(JSON.stringify(list));
      }
    };

    var keys = reply.map(function(key){
      return "urls:" + key;
    });

    for(var i = 0, max = reply.length; i < max; i += 1) {
      redis.hgetall(keys[i],insert);
    }
    */
  });
};

var totalCount = function totalCount(req, res) {
  redis.get(keys.totalCount,function(err, reply) {
    if(reply) {
      res.send(JSON.stringify({totalCount: reply}));
    } else {
      res.send(JSON.stringify({totalCount: 0}));
    }
  });
};
