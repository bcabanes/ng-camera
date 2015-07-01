# ng-camera

Ng-camera is an AngularJS directive for capturing images
form your computer's camera, and delivering them to you as [Data URIs](http://en.wikipedia.org/wiki/Data_URI_scheme).
The images is transmitted to your AngularJS controller and can be modified
like you want.

To manage this process, ng-camera uses the [WebcamJS](https://github.com/jhuckaby/webcamjs) standalone Javascript library developed by Joseph Huckaby,
to ensure fallback and crossbrowser requirements.

## Live example

To see a live example, go to the [demo's page](http://bcabanes.github.io/ng-camera).

## Installation

#### Using [Bower](http://bower.io/)

```bash
bower install ng-camera
```

## Usage

### Import files scripts

Ng-camera uses WebcamJS to work properly so you need to add the script in your
main file, don't forget to load the directive file:

```html
<script src="/path/to/webcam.js"></script>
<script src="/path/to/ng-camera.js"></script>
```

### Add the module as dependency

Simply add the module as dependency to your main application module like this:
```javascript
angular.module('myApplication', ['camera']);
```

### The directive

```html
<ng-camera
    capture-message="Cheeeese!"
    countdown="3"
    output-height="160"
    output-width="213"
    viewer-height="320"
    viewer-width="426"
    crop-height="90"
    crop-width="120"
    image-format="jpeg"
    jpeg-quality="100"
    action-message="Take picture"
    snapshot="vm.picture"
    flash-fallback-url="/vendors/webcamjs/webcam.swf"
    overlay-url="/overlay.png"
    shutter-url="/shutter.mp3"
></ng-camera>
```

#### Options

ng-camera comes with lots of options to simplify your development:

* `capture-message` _string_ Message to display when the countdown is finished
| _dependant of_ `countdown`
* `countdown` _string_ Number of seconds to wait and display before getting
the snapshot | _opional_
* `output-height` _string_ Height of the captured snapshot image in pixels | _default to_ `viewer-height`
* `output-width` _string_ Width of the captured snapshot image in pixels | _default to_ 'viewer-width'
* `viewer-height` _string_ Height of the live camera viewer in pixels | _default to the actual size of the DOM element_ `'auto'`
* `crop-height` _string_ Crop height of the captured snapshot image in pixels | _default to_ 'false'
* `crop-width` _string_ Crop width of the captured snapshot image in pixels | _default to_ 'false'
* `image-format` _string_ Image format of captured snapshot image, may be `jpeg` or `png` | **not used**
* `jpeg-quality` _string_ For JPEG images, this is the desired quality, from 0 (worst) to 100 (best) | **not used**
* `action-message` _string_ Message/Text to display inside the action button
* `snapshot` _object_ AngularJS model to retreive the snapshot image to your controller
* `flash-fallback-url` _string_ Url of the Adobe Flash player to enable the fallback and crossbrowser modes, _default based on_ `navigator.getUserMedia`
* `overlay-url` _string_ Overlay's url to display on top of the camera stream
* `shutter-url` _string_ Shutter sound's url to play when taking the snapshot

### Working example

A working example is available in the `app` folder.
Make sure to install bower and node dependencies:

```bash
npm install && bower install
```

Then start the node server, it will be accessible on `http:0.0.0.0:3000`

```bash
node server.js
```

## License

The MIT License (MIT)

Copyright (c) 2015 Benjamin Cabanes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
