define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/recentShortening.tmpl'
],function($, _, Backbone, recentShorteningTemplate){

  var recentShorteningView = Backbone.View.extend({
    tagName: "li",

    initialize: function() {
    },

    template: _.template(recentShorteningTemplate),

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  //return a new view to folks including this file, it now works with require.js
  return recentShorteningView;
});
