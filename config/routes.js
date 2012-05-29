var routes = routes || {};

routes.ajax = (function(){

  //you might to some other magic here like reading the routes from
  //a file or whatever

  var ajaxRoutes = {};
  ajaxRoutes.ajaxRoutePrefix = "/ajax/";
  ajaxRoutes.newShortsUrl = ajaxRoutes.ajaxRoutePrefix + "newurls";
  ajaxRoutes.totalCountUrl = ajaxRoutes.ajaxRoutePrefix + "totalcount";
  return ajaxRoutes;

})();

module.exports = routes.ajax;


