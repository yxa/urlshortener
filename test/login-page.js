
var Browser  = require('zombie');
var assert  = require('assert');
var app     = require('../app');

Browser.debug = true;
browser = new Browser();

app.listen(app.settings.port);

describe('display login page',function() {
  after(function(){
    //app.close();
  });

  it('should return the title on GET',function(done) {
   browser.visit("http://localhost:" + app.settings.port + "/login", {debug: true}, function(err,browser) {
      if(err) console.log(err.message);
      assert.equal(browser.text('title'),'login');
      done();
    });
  });
});
