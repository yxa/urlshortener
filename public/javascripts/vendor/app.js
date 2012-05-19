define(['jQuery','Underscore','Backbone','../view/totalCounter'], function($, _, Backbone,totalCounterView) {
  var init = function() {
    totalCounterView.render();
  }
  return {
    init: init
  };
});
