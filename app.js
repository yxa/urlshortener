var fs = require('fs'),
    im = require("imagemagick"),
    express = require('express'),
    RedisStore = require('connect-redis')(express),
    app = module.exports = express.createServer(),
    config = require('./config'),
    winston = require('./winston');

// this require statement makes it possible to write code in coffeescript
require('coffee-script');

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', 3000);
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.session({ secret:'yodawgyo' })); //why do i need this,flash wont work otherwise
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  //this going to change in express 3.x
  app.dynamicHelpers({flash: function(req, res){return req.flash();}});
});


app.configure('development', function(){
  console.log("we are in development mode with this secret key %s",config.redis.secret);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  redis = require('redis').createClient(config.redis.href);
  app.use(express.session({
    secret: config.redis.secret,
    store: new RedisStore({client:redis})
  }));
});

app.configure('test', function(){
  console.log("we are in test mode with this secret key %s",config.redis.secret);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('port',3001);
  redis = require('redis').createClient(config.redis.href);
  app.use(express.session({
    secret: config.redis.secret,
    store: new RedisStore({client:redis})
  }));
});

app.configure('production', function(){
  console.log("we are in production mode now boyah");
  app.use(express.errorHandler());
  redis = require('redis').createClient(config.redis.port,config.redis.hostname);
  redis.auth(config.redis.url.auth.split(':')[1]);
  app.use(express.session({
    secret: config.redis.secret,
    store: new RedisStore({client:redis})
  }));
});

require('./routes/index')(app);

function NotFound(msg) {
  this.name = 'NotFound';
  Error.call(this,msg);
  Error.captureStackTrace(this,arguments.callee);
};
NotFound.prototype.__proto__ = Error.prototype;

app.use(function(err, req, res, next) {
  if(err instanceof NotFound) {
    res.render('404',{status: 404});
  } else {
    next(err);
  }
});

app.error(function(err, req, res, next) {
  res.render('500', {status: 500});
});

app.get('/404', function(req, res) {
  throw new NotFound('could not find the requested page');
});

app.get('/500',function(req, res) {
  throw new Error('this is a 500 error');
});

if(!module.parent) {
  app.listen(process.env.PORT || app.settings.port);
}

console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
