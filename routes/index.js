var winston     = require('../winston'),
    utils       = require('../utils'),
    logPrefixes = require('../config/logPrefixes').log.prefixes,
    redisConfig = require('../config/redis_keys').redis,
    redisKeys   = redisConfig.keys;
    redisLimits = redisConfig.limits;

module.exports = function(app,redis) {
  app.get('/',index);
  app.post('/',createUrl);
  app.get('/:lookup',lookupUrl);
};

var index = function index(req, res){
  res.render('index', { title: 'url shortener delux' })
};

var isUrl = function isUrl(s) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(s);
};

var createUrl = function createUrl(req, res) {

  //key value pairs is in log files a golden when using ex Splunk
  winston.security("user tried to shorten this " + logPrefixes.kvString(logPrefixes.urlPrefix, req.body.url)
                                                 + " "
                                                 + logPrefixes.kvString(logPrefixes.ipPrefix, utils.getClientIp(req)));

  if(!req.body.url) {
    req.flash('error','Url not specified');
    res.redirect('/');
  } else {
    var containsPrefix = req.body.url.search('http://');

    if(containsPrefix === -1) {
      req.body.url = 'http://' + req.body.url;
    }

    var randomSequence =redisKeys.generateUrlPostfixKey();

    redis.multi()
      .incr(redisKeys.totalCount)
      .hset(redisKeys.urlPrefix + randomSequence, "url", req.body.url)
      .lpush(redisKeys.newUrls ,randomSequence)
      .ltrim(redisKeys.newUrls, 0, redisLimits.totalUrlsInMemory)
      .exec(function(err, reply){
        console.log(reply);
        if(reply) {
          winston.security("");
        }
      });

    req.flash('info', req.headers.host + '/' + randomSequence);
    res.redirect('/');
  }
};

var lookupUrl = function lookupUrl(req, res) {
  console.log("entering lookup");
  console.log(redisKeys);
  var key = req.params.lookup;
  if(key != null && key != 'favicon.ico') {
    redis.hget(redisKeys.urlPrefix + key, "url", function(err, reply){
      if(reply) {
        res.redirect(reply);
      } else {
        res.redirect('/');
      }
    });
  }
};
