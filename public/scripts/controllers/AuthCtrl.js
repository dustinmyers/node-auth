(function() {
   "use strict";

    function AuthCtrl(authService, $state) {

        var _this = this;

        _this.login = function(user) {

            authService.login(user).then(function(res) {
                console.log(res);
                //$state.go('dashboard');
            });
        };

    }

    angular
        .module('nodeAuth')
        .controller('AuthCtrl', AuthCtrl);

})();