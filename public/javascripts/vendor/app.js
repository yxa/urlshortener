define(['jQuery','Underscore','Backbone','../view/totalCounter'], function($, _, Backbone,totalCounterView) {
  var init = function() {
    //configuration

    totalCounterView.render();
    $("#url").focus();
  }
  return {
    init: init
  };
});
