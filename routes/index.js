var winston     = require('../winston'),
    utils       = require('../utils'),
    logPrefixes = require('../config/log_prefixes').log.prefixes,
    redisConfig = require('../config/redis_keys').redis;

var redisKeys   = redisConfig.keys;
var redisLimits = redisConfig.limits;

module.exports = function(app,redis) {
  app.get('/',index);
  app.post('/',createUrl);
  app.get('/:lookup',lookupUrl);
};

var index = function index(req, res){
  res.render('index', { title: 'url shortener delux' })
};

//just a quick check with a incomplete regexp, but this should do for a now
var isUrl = function isUrl(url) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  return regexp.test(url);
};

var createUrl = function createUrl(req, res) {

  //key value pairs is in log files a golden when using ex Splunk
  winston.security("received shortening request " + logPrefixes.kvString(logPrefixes.urlPrefix, req.body.url)
                                                 + " "
                                                 + logPrefixes.kvString(logPrefixes.ipPrefix, utils.getClientIp(req)));

  //you should create another config file for the binding between the css classes and the flash
  //if its used again in another file
  if(!req.body.url || !isUrl(req.body.url)) {
    req.flash('alert-error','check your url syntax!');
    res.redirect('/');
  } else {
    var randomSequence = redisKeys.generateUrlPostfixKey();

    //we dont want more than 10 urls in the newurls list, trim it!
    redis.multi()
      .incr(redisKeys.totalCount)
      .hset(redisKeys.urlPrefix + randomSequence, "url", req.body.url)
      .lpush(redisKeys.newUrls ,randomSequence)
      .ltrim(redisKeys.newUrls, 0, redisLimits.maxUrlsInMemory)
      //what to do with reply?
      .exec(function(err, reply){
        if(reply) {
          req.flash('alert-info', req.headers.host + '/' + randomSequence);
          res.redirect('/');
        } else {
          req.flash('alert-error',"could not save to redis backend");
          res.redirect('/');
        }
      });
  }
};

var lookupUrl = function lookupUrl(req, res) {
  console.log(redisKeys);
  var key = req.params.lookup;
  //favicon wtf, could move the url to something else then /
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
