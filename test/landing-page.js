var Browser  = require('zombie');
var assert  = require('assert');
var app     = require('../app');

Browser.debug = true;
browser = new Browser();

app.listen(app.settings.port);

describe('display landing page', function() {

  after(function(){
    //app.close();
  });

  it('should return correct title on GET',function(done){
   browser.visit("http://localhost:" + app.settings.port,{debug: true}, function(err,browser) {
      if(err) console.log(err.message);
      assert.equal(browser.text('title'),'Express');
      browser.dump();
      done();
    });
  });
});


