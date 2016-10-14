
var $urlRouterProviderRef = null;
var $stateProviderRef = null;
var app = angular.module('app', ["ui.router", "ui.router", "ui.bootstrap",
        "ui.bootstrap.tpls", "summernote"]);
app.config(function($stateProvider, $urlRouterProvider) {
   $urlRouterProviderRef = $urlRouterProvider;
   $stateProviderRef = $stateProvider;
});
$(document).ready(function(){
    $('[data-toggle=tooltip]').hover(function(){
        // on mouseenter
        $(this).tooltip('show');
    }, function(){
        // on mouseleave
        $(this).tooltip('hide');
    });
});