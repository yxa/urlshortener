var Browser  = require('zombie');
var assert  = require('assert');
var app     = require('../app');

//Browser.debug = true;
browser = new Browser();

app.listen(app.settings.port);

describe('display landing page', function() {

  before(function(){
    console.log("starting test");
    redis.flushdb();
  });

  it('should return correct title on GET',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: false}, function(err,browser) {
      if(err) console.log(err.message);
      assert.equal(browser.text('title'),'url shortener delux');
      done();
    });
  });

  it('should be able post request to shorten url and get total count',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: true}, function(err,browser) {
      if(err) console.log(err.message);
      browser.fill("url","http://www.dn.se").
      pressButton("shorten",function(){
        assert.ok(browser.success);
        redis.get("stats:urls",function(err,reply){
          assert.equal(reply,"1");
          done();
        });
      });
    });
  });

 it('should be able post request and get translated url',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: true}, function(err,browser) {
      if(err) console.log(err.message);
      browser.fill("url","http://www.dn.se").
      pressButton("shorten",function(){
        assert.ok(browser.success);
        var translatedUrl = browser.text("#translated-url").split('/')[1];
        redis.keys("urls:" + translatedUrl, function(err,reply){
          if(reply.length > 0) {
            assert.ok(true);
            done();
          } else {
            assert.ok(false);
            done();
          }
        });
      });
    });
 });

});
