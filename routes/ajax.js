var winston = require('../winston'),
    _       = require('underscore'),
    keys    = require('../config/redis_keys').redis.keys,
    routes  = require('../config/routes');

module.exports = function(app) {
  //all ajax routes should have a content type of application/json
  app.all(routes.ajaxRoutePrefix + '*', function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  console.log(routes);

  app.get(routes.newShortsUrl,newUrls);
  app.get(routes.totalCountUrl, totalCount);
};

var newUrls = function newUrls(req, res) {
  redis.lrange("newurls", 0, 10, function(err, reply){
    async.map(reply, function(uri, cb) {
      var key = "urls:" + uri
      redis.hgetall(key, cb);
    }, function(err, list) {
      console.log("returning json data");
      res.json(list.map(function(elm) {return elm.url}));
    })


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
    }
  });
};
