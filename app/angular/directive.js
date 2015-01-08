(function(angular) {
    'use strict';

    angular
        .module('camera')
        .directive('ngCamera', directive);

    directive.$inject = [];

    function directive() {
        return {
            'restrict': 'E',
            'scope': {

            },
            'templateUrl': '/angular/ng-camera.html',
            'link': link
        };

        function link() {
console.log('hello directive');
        }
    }

})(angular);
