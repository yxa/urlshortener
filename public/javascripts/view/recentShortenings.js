define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!templates/recentShortenings.tmpl',
    '../collections/urls',
    '../view/recentShortening'
],function($, _, Backbone, recentShorteningsTemplate,urlCollection, recentShorteningView){

  var recentShorteningsView = Backbone.View.extend({

    initialize: function() {
      this.collection = urlCollection;
      this.collection.bind('reset',this.render,this);
      this.collection.getUrls();
    },

    render: function() {
        var self = this;
        this.collection.each(function(item){
          self.$el.append(new recentShorteningView({model: item}).render().el);
        });
      return this;
    }
  });

  //return a new view to folks including this file, it now works with require.js
  return new recentShorteningsView({el: $("ul#recent-shortenings")});
});
