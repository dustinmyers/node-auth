(function() {
   "use strict";

    angular
        .module('nodeAuth', [
            'ui.router'
        ]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        //Set default route
        $urlRouterProvider.otherwise("/");

        //Set states for the giftshop app
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'views/login.html',
                controller: 'AuthCtrl as login'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl as dash'
            });
    }]);
})();