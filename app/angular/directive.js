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
                'actionMessage': '@',
                'height': '@',
                'width': '@',
                'imageFormat': '@',
                'jpegQuality': '@',
                'snapshot': '='
            },
            'templateUrl': '/angular/ng-camera.html',
            'link': link
        };

        function link(scope, element, attrs) {

            /**
             * Set default variables
             */
            scope.loaded = false;
            scope.cameraLive = false;

            /**
             * Set configuration parameters
             * @type {object}
             */
            Webcam.set({
                width: scope.width,
                height: scope.height,
                image_format: scope.imageFormat,
                jpeg_quality: scope.jpegQuality,
                force_flash: false
            });
            Webcam.setSWFLocation('/vendors/webcamjs/webcam.swf');
            Webcam.attach('#ng-camera-feed');

            /**
             * Register WebcamJS events
             */
            Webcam.on('load', libraryLoaded);
            Webcam.on('live', cameraLive);
            Webcam.on('error', error);

            var libraryLoaded = function() {
                scope.libraryLoaded = true;
            };
            var cameraLive = function() {
                scope.cameraLive = true;
            };
            var error = function(error) {
                console.error('WebcameJS directive ERROR: ', error);
            };

            /**
             * Get snapshot
             */
            scope.getSnapshot = function() {
                Webcam.snap(function(data_uri) {
                    scope.snapshot = data_uri;
                });
            };

        }
    }

})(angular);
