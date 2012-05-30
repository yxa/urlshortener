var Browser = require('zombie'),
    assert  = require('assert'),
    app     = require('../app');

browser = new Browser();
app.listen(app.settings.port);

//use another db for test ENV, dont mess up the development db!
redis.select(3);

describe('display landing page', function() {

  beforeEach(function(){
    redis.flushdb();
  });

  after(function(){
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
   browser.visit("http://localhost:" + app.settings.port,{debug: false}, function(err,browser) {
      if(err) console.log(err.message);
      browser.fill("url","http:///www.dn.se").
      pressButton("shorten-button",function(){
        assert.ok(browser.success);
        redis.get("stats:urls",function(err,reply){
          assert.equal(reply,"1");
          done();
        });
      });
    });
  });

 it('should be able post request and get translated url',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: false}, function(err,browser) {
      if(err) console.log(err.message);
      browser.fill("url","http://www.dn.se").
      pressButton("shorten-button",function(){
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

  it('should be able post requests to shorten url and get the most recent shortened urls in view ',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: false}, function(err,browser) {
      if(err) console.log(err.message);
      browser.fill("url","http://www.aftonbladet.se").
      pressButton("shorten-button",function(){
        assert.ok(browser.success);
        browser.fill("url","http://www.idg.se").pressButton("shorten-button",function(){
          assert.ok(browser.success);
          var urls = browser.query("#recent-shortenings").childNodes;
          //console.log(urls["1"].childNodes[0].innerHTML);
          //console.log(urls["0"].childNodes[0].innerHTML);
          assert.equal(urls["0"].childNodes[0].innerHTML,"http://www.idg.se");
          assert.equal(urls["1"].childNodes[0].innerHTML,"http://www.aftonbladet.se");
          done();
        });
      });
    });
  });
});
