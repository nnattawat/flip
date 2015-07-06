# jQuery Plugin - flip

**A lightweight jQuery plugin to create 3d flip animation.** 
See the [project page](http://download.github.io/flip/)

This project was forked from [nnattawat/flip](http://nnattawat.github.io/flip/).

## What's new
Flip v1.0.7 
* [Improved backward compatibility](https://github.com/Download/flip/commit/b27588b1e5340ec2a6bfc5afca80a6e52b6f833f)

Flip v1.0.6 
This version adds new features and fixes some issues compared to the original flip:
* [Added support for flippable content with dynamic height/width #17](https://github.com/nnattawat/flip/issues/17)
* [Added ability to change axis arbitrarily #1](https://github.com/download/flip/pull/1)
* [Flip prevents bubbling of click on 'button, a, input[type="submit"], breaking e.g. Swipebox #14](https://github.com/nnattawat/flip/issues/14)
* [Flickering animations of elements in flipped content. #16](https://github.com/nnattawat/flip/issues/16)
 

## Getting Started

### CDN
    https://cdn.rawgit.com/download/flip/v1.0.7/dist/jquery.flip.min.js

### Download 
* [jquery.flip.min.js][min] (production version, minified ~3Kb, gzipped ~2Kb)
* [jquery.flip.js][max] (development version, commented ~7Kb)
[min]: https://cdn.rawgit.com/download/flip/v1.0.7/dist/jquery.flip.min.js
[max]: https://cdn.rawgit.com/download/flip/v1.0.7/dist/jquery.flip.js

### Bower
<pre>bower install flip</pre>

### Usage
In your web page:

```html

<div id="card"> 
  <div class="front"> 
    Front content
  </div> 
  <div class="back">
    Back content
  </div> 
</div>

<script src="jquery.js"></script>
<script src="jquery.flip.js"></script>
<script>
$(function($) {
  $("#card").flip(); 
});
</script>
```

## Documentation and Example

Please refer to [github.io](http://nnattawat.github.io/flip/)

## Development
Ensure that you have the latest [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Test that Grunt's CLI and Bower are installed by running `grunt --version` and `bower --version`.  If the commands aren't found, run `npm install -g grunt-cli bower`.  For more information about installing the tools, see the [getting started with Grunt guide](http://gruntjs.com/getting-started) or [bower.io](http://bower.io/) respectively.

To run the demo locally, do the following.
<pre>
npm install
bower install
</pre>

And run grunt command to create files in /dist folder.
<pre>grunt</pre>