
var $urlRouterProviderRef = null;
var $stateProviderRef = null;
var app = angular.module('app', ["ui.router", "ui.router", "ui.bootstrap",
        "ui.bootstrap.tpls"]);
app.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProviderRef = $urlRouterProvider;
   $stateProviderRef = $stateProvider;
});
  $(function(){
$("#addClass").click(function () {
          $('#qnimate').addClass('popup-box-on');
            });
          
            $("#removeClass").click(function () {
          $('#qnimate').removeClass('popup-box-on');
            });
  })