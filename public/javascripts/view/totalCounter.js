define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/totalCounter.tmpl'
],function($, _, Backbone, totalCounterTemplate){

  var totalCounterView = Backbone.View.extend({
    el: $("footer"),

    initialize: function() {
    },

    template: _.template(totalCounterTemplate),

    render: function() {
      console.log("rendering totalCounterView");
      var that = this;
      $.ajax({url: '/ajax/totalcount'}).done(function(data){
        console.log(data);
        that.$el.html(that.template(data));
      });
    }
  });

  return new totalCounterView;
});
