require.config({
  baseUrl: "/javascripts/vendor"
});

require(["order!/javascripts/vendor/jquery-1.7.2.js",
        "order!/javascripts/vendor/underscore.js",
        "order!/javascripts/vendor/backbone.js"], function($) {
      //This callback is called after the three scripts finish loading.
     });
