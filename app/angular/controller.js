(function(angular) {
    'use strict';

    angular
        .module('camera')
        .controller('cameraController', controller);

    controller.$inject = [];

    function controller() {
        /* jshint validthis: true */
        var vm = this;

        vm.picture = false; // Initial state
    }

})(angular);
