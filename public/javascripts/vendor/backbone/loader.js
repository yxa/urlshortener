define(['order!jquery/jquery-1.7.2', 'order!underscore/underscore', 'order!backbone/backbone'],
  function(){
    return {
      Backbone: Backbone.noConflict(),
       _: _.noConflict(),
       $: jQuery.noConflict()
    };
});
