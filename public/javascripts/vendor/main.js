require.config({
  baseUrl: "/javascripts/vendor",
  paths: {
    "loader":     "backbone/loader",
    "jQuery":     "jquery/jquery-1.7.2-loader", //this jquery version is amd ready
    "Underscore": "underscore/underscore-loader",
    "Backbone":   "backbone/backbone-loader",
    "templates":  "../templates"
  }
});

require(['app'],function(app){
  app.init();
});
