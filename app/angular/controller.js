(function(angular) {
    'use strict';

    angular
        .module('camera')
        .controller('cameraController', controller);

    controller.$inject = [];

    function controller() {
console.log('hello controller');
    }

})(angular);
