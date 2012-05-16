module.exports = function(app) {
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
  console.log("user tried to shorten this URL < %s >", req.body.url);
  var TIMEOUT = 60 * 60 * 24;

  if(!req.body.url) {
    req.flash('error','Url not specified');
    res.redirect('/');
  } else {
    var containsPrefix = req.body.url.search('http://');
    if(containsPrefix === -1) {
      req.body.url = 'http://' + req.body.url;
    }
    var randomSequence = Math.random().toString(36).substr(2, 5);
    redis.set(randomSequence, req.body.url);
    redis.expire(randomSequence,TIMEOUT);
    console.log(req.headers);
    req.flash('info', req.headers.host + '/' + randomSequence);
    res.redirect('/');
  }
};

var lookupUrl = function lookupUrl(req, res) {
  var key = req.params.lookup;
  console.log("the key is %s", key);
  if(key != null && key != 'favicon.ico') {
    redis.get(key, function(err, reply){
      console.log("reply back from redis was %s",reply);
      if(reply) {
        console.log("redirecting user");
        res.redirect(reply);
      } else {
        console.log("redirecting back to home");
        res.redirect('/');
      }
    });
  }
};
