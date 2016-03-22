(function() {
   "use strict";

    angular
        .module('nodeAuth', [
            'ui-router'
        ]).config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //Clean urls - turn off # in urls
        $locationProvider.html5Mode(true);
        //Set default route
        $urlRouterProvider.otherwise("/login");

        //Set states for the giftshop app
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl as login'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashCtrl as dash'
            });
    }]);
});