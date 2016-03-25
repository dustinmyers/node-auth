(function() {
   "use strict";

    function AuthCtrl(authService, $state) {

        var _this = this;

        _this.login = function(user) {
          console.log(user)
            authService.login({username: user.email, password: user.password}).then(function(res) {
                console.log(res);
                //$state.go('dashboard');
            });
        };

        _this.register = function(user) {
          authService.register(user).then(function(res) {
              console.log(res);
              //$state.go('dashboard');
          });
        }

        _this.getStuff = function () {
          authService.getStuff()
        }

    }

    angular
        .module('nodeAuth')
        .controller('AuthCtrl', AuthCtrl);

})();
