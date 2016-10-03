
var $urlRouterProviderRef = null;
var $stateProviderRef = null;
var app = angular.module('app', ["ui.router", "ui.router", "ui.bootstrap",
        "ui.bootstrap.tpls"]);
app.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProviderRef = $urlRouterProvider;
   $stateProviderRef = $stateProvider;
})