define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/totalCounter.tmpl'
],function($, _, Backbone, totalCounterTemplate){

  var totalCounterView = Backbone.View.extend({
    initialize: function() {
    },

    template: _.template(totalCounterTemplate),

    render: function() {
      var that = this;
      $.ajax({url: '/ajax/totalcount'}).done(function(data){
        that.$el.append(that.template(data));
      });
      return this;
    }
  });
  //return a new view to folks including this file, it now works with require.js
  return new totalCounterView({el: $("div#stats")});
});
