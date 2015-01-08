/* global Webcam */
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
                'height': '=',
                'width': '=',
                'imageFormat': '='
            },
            'templateUrl': '/angular/ng-camera.html',
            'link': link
        };

        function link(scope, element, attrs) {
console.log('hello directive');

            Webcam.set({
                width: scope.width,
                height: scope.height,
                image_format: scope.imageFormat,
                jpeg_quality: 100,
                force_flash: false
            });
            Webcam.setSWFLocation('/vendors/webcamjs/webcam.swf');
            Webcam.attach('#ng-camera-feed');

console.log(scope.imageFormat);
        }
    }

})(angular);
