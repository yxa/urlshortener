define(['Backbone','jQuery','../model/url'],function(Backbone,$,urlModel){

  var urlCollection = Backbone.Collection.extend({
    model: urlModel,

    initialize: function() {
    },

    getUrls: function() {
      var self = this;
      $.ajax({url: '/ajax/newurls'}).done(function(data){
        console.log(data);
        self.reset(data);
      });
    }
  });

  return new urlCollection;
});
