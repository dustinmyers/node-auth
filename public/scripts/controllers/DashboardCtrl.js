(function() {
    "use strict";

    function DashboardCtrl() {
        var _this = this;

        _this.test = "Hello folks!";

    }

    angular
        .module('nodeAuth')
        .controller('DashboardCtrl', DashboardCtrl);

})();