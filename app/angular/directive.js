/* global Webcam */
(function(angular) {
    'use strict';

    angular
        .module('camera')
        .directive('ngCamera', directive);

    directive.$inject = ['$q', '$timeout'];

    function directive($q, $timeout) {
        return {
            'restrict': 'E',
            'scope': {
                'actionMessage': '@',
                'captureMessage': '@',
                'countdown': '@',
                'flashFallbackUrl': '@',
                'overlayUrl': '@',
                'outputHeight': '@',
                'outputWidth': '@',
                'shutterUrl': '@',
                'viewerHeight': '@',
                'viewerWidth': '@',
                'cropHeight': '@',
                'cropWidth': '@',
                'imageFormat': '@',
                'jpegQuality': '@',
                'snapshot': '='
            },
            // 'templateUrl': '/angular/ng-camera.html',
            'template': ['<div class="ng-camera">',
                '<div class="ng-camera-countdown" ng-if="countdown" ng-show="activeCountdown">',
                '<p class="tick">{{countdownText}}</p>',
                '</div>',
                '<div class="ng-camera-stack">',
                '<img class="ng-camera-overlay" ng-if="overlayUrl" ng-show="cameraLive" ng-src="{{overlayUrl}}" alt="overlay">',
                '<div id="ng-camera-feed"></div>',
                '</div>',
                '<button id="ng-camera-action" ng-click="getSnapshot()">{{actionMessage}}</button>',
                '</div>'].join(''),
            'link': link
        };

        function link(scope, element, attrs) {
            /**
             * Set default variables
             */
            scope.libraryLoaded = false;
            scope.cameraLive = false;
            scope.activeCountdown = false;

            /**
             * Set dimensions
             */
            if(scope.viewerHeight === undefined) {
                scope.viewerHeight = 'auto';
            }
            if(scope.viewerWidth === undefined) {
                scope.viewerWidth = 'auto';
            }
            if(scope.outputHeight === undefined) {
                scope.outputHeight = scope.viewerHeight;
            }
            if(scope.outputWidth === undefined) {
                scope.outputWidth = scope.viewerWidth;
            }

            /**
             * Disable cropping if one or the two params are undefined
             */
            if(scope.cropHeight === undefined || scope.cropWidth === undefined) {
                scope.cropHeight = false;
                scope.cropWith = false;
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
                crop_width: scope.cropWidth,
                crop_height: scope.cropHeight,
                image_format: scope.imageFormat,
                jpeg_quality: scope.jpegQuality,
                force_flash: false
            });
            if(scope.flashFallbackUrl !== 'undefined') {
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
             * Preload the shutter sound
             */
            if(scope.shutterUrl !== undefined) {
                scope.shutter = new Audio();
                scope.shutter.autoplay = false;
                if(navigator.userAgent.match(/Firefox/)) {
                    scope.shutter.src = scope.shutterUrl.split('.')[0] + '.ogg';
                } else {
                    scope.shutter.src = scope.shutterUrl;
                }
            }

            /**
             * Set countdown
             */
            if(scope.countdown !== undefined) {
                scope.countdownTime = parseInt(scope.countdown) * 1000;
                scope.countdownText = parseInt(scope.countdown);
            }
            scope.countdownStart = function() {
                scope.activeCountdown = true;
                scope.countdownPromise = $q.defer();
                scope.countdownTick = setInterval(function() {
                    return scope.$apply(function() {
                        var nextTick;
                        nextTick = parseInt(scope.countdownText) - 1;
                        if(nextTick === 0) {
                            scope.countdownText = scope.captureMessage != null ? scope.captureMessage : 'GO!';
                            clearInterval(scope.countdownTick);
                            scope.countdownPromise.resolve();
                        }else{
                            scope.countdownText = nextTick;
                        }
                    });
                }, 1000);
            };

            /**
             * Get snapshot
             */
            scope.getSnapshot = function() {
                if(scope.countdown !== undefined) {
                    scope.countdownStart();
                    scope.countdownPromise.promise.then(function() {
                        $timeout(function() {
                            scope.activeCountdown = false;
                            scope.countdownText = parseInt(scope.countdown);
                        }, 2000);

                        if(scope.shutterUrl !== undefined) {
                            scope.shutter.play();
                        }

                        Webcam.snap(function(data_uri) {
                            scope.snapshot = data_uri;
                        });
                    });
                } else {
                    if(scope.shutterUrl !== undefined) {
                        scope.shutter.play();
                    }

                    Webcam.snap(function(data_uri) {
                        scope.snapshot = data_uri;
                    });
                }
            };

            scope.$on('$destroy', function() {
                Webcam.reset();
            });
        }
    }

})(angular);
