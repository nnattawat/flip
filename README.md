[![Build Status](https://travis-ci.org/nnattawat/flip.svg?branch=master)](https://travis-ci.org/nnattawat/flip)
# jQuery Flip

**A lightweight jQuery plugin to create 3d flip animation.** 
See the [project page](http://nnattawat.github.io/flip/)

## Getting Started

### CDN
  https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js

### Download 
* [jquery.flip.js][max] (development version, commented ~9kB)
* [jquery.flip.min.js][min] (production version, minified ~4kB, gzipped ~2kB)
* [jquery.flip.min.js.map][map] (source map, ~5kB)
[max]: https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.js
[min]: https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js
[map]: https://cdn.rawgit.com/nnattawat/flip/master/dist/jquery.flip.min.js.map

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

Please refer to [the project website](http://nnattawat.github.io/flip/)

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

## What's new
Please refer to [the release page](https://github.com/nnattawat/flip/releases)
