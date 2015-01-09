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
                'flashFallbackUrl': '@',
                'overlaySrc': '@',
                'outputHeight': '@',
                'outputWidth': '@',
                'viewerHeight': '@',
                'viewerWidth': '@',
                'imageFormat': '@',
                'jpegQuality': '@',
                'snapshot': '='
            },
            'templateUrl': '/angular/ng-camera.html',
            'link': link
        };

        function link(scope, element, attrs) {
console.log(scope);
            /**
             * Set default variables
             */
            scope.libraryLoaded = false;
            scope.cameraLive = false;

            /**
             * Set output dimensions
             */
            if(scope.outputHeight === 'undefined') {
                scope.outputHeight = scope.viewerHeight;
            }
            if(scope.outputWidth === 'undefined') {
                scope.outputWidth = scope.viewerWidth;
            }

            /**
             * Set configuration parameters
             * @type {object}
             */
            Webcam.set({
                width: scope.viewerWidth,
                height: scope.viewerHeight,
                dest_width: scope.outputWidth,
                dest_height: scope.outputHeight,
                image_format: scope.imageFormat,
                jpeg_quality: scope.jpegQuality,
                force_flash: false
            });
            if(scope.flashFallbackUrl !== 'undefined') {
                Webcam.setSWFLocation(scope.flashFallbackUrl);
            }
            Webcam.attach('#ng-camera-feed');

            /**
             * Register WebcamJS events
             */
            Webcam.on('load', function() {
                console.info('library loaded');
                scope.$apply(function() {
                    scope.libraryLoaded = true;
                });
            });
            Webcam.on('live', function() {
                console.info('camera live');
                scope.$apply(function() {
                    scope.cameraLive = true;
                });
            });
            Webcam.on('error', function(error) {
                console.error('WebcameJS directive ERROR: ', error);
            });

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
