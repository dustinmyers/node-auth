(function() {
    "use strict";

    function authService($http, $q) {

        var _this = this;

        _this.login = function(user) {
            console.log(user)
            var deferred = $q.defer();
            var request = $http.post('/api/login', user);

            request.then(function(res) {
                // console.log(res);
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        _this.register = function(user) {
            var deferred = $q.defer();
            var request = $http.post('/api/register', user);

            request.then(function(res) {
                // console.log(res);
                deferred.resolve(res);
            });
            return deferred.promise;
        };

        _this.getStuff = function () {
          return $http.get('/api/coolDataStuffz').then(function(res) {
            console.log(res.data)
          })
        }

    } // end service

    angular
        .module('nodeAuth')
        .service('authService', authService);

})();
