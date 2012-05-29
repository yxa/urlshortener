define(['loader'], function(Loader){
    //configure underscores template library to use handlebars syntax
    Loader._.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    return Loader._;
});
