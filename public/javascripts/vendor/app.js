define(['jQuery',
        'Underscore',
        'Backbone',
        '../view/totalCounter',
        '../view/recentShortenings'], function($, _, Backbone,totalCounterView,recentShorteningsView) {
  var init = function() {
    //configuration
    //recentShorteningsView.render();
    totalCounterView.render();

    $("#url").focus();
  }
  return {
    init: init
  };
});
