var winston = require('../winston');
var async = require('asyncjs');
var _ = require('underscore');

module.exports = function(app) {
  app.all('/ajax/*', function(req, res, next) {
    res.contentType('application/json');
    next();
  });

  app.get('/ajax/newurls', newUrls);
  app.get('/ajax/totalCount', totalCount);
};

var newUrls = function newUrls(req, res) {
  redis.lrange("newurls", 0, 10, function(err, reply){
    var list = [];
    var size = reply.length;

    var insert = function insert(err,reply){
      size--;
      list.push(reply.url);
      if(size === 0) {
        res.send(JSON.stringify(list));
      }
    };

    var keys = _.map(reply,function(key){
      return "urls:" + key;
    });

    for(var i = 0, max = reply.length; i < max; i += 1) {
      redis.hgetall(keys[i],insert);
    }
  });
};

var totalCount = function totalCount(req, res) {
  redis.get("stats:urls",function(err, reply) {
    if(reply) {
      res.send(JSON.stringify({totalCount: reply}));
    } else {
      console.log("ERR");
    }
  });
};
