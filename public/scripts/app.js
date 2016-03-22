(function() {
   "use strict";

    angular
        .module('nodeAuth', [
            'ui-router'
        ]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        //Clean urls - turn off # in urls
        $locationProvider.html5Mode(true);
        //Set default route
        $urlRouterProvider.otherwise("/login");

        //Set states for the giftshop app
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'MainCtrl as app'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: window.SOC.static_path + 'gifts/views/giftStore.html',
                controller: 'GiftStoreCtrl as gifts'
            });
    }]);
});