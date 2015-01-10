# ng-camera

Ng-camera is an AngularJS directive for capturing images
form your computer's camera, and delivering them to you as [Data URIs](http://en.wikipedia.org/wiki/Data_URI_scheme).
The images is transmitted to your angularjs controller and can be modified
like you want.

To manage this process, ng-camera uses the [WebcamJS](https://github.com/jhuckaby/webcamjs) standalone Javascript library developed by Joseph Huckaby,
to ensure fallback and crossbrowser requirements.

## Download

## Installation

## Usage

### Add the module as dependency

### The directive

```html
<ng-camera
    capture-message="Cheeeese!"
    countdown="3"
    output-height="160"
    output-width="213"
    viewer-height="320"
    viewer-width="426"
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
the snapshot
