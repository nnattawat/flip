# jQuery Plugin - flip

A lightweight jQuery plugin to create 3d flip animation. Learn more on [github.io](http://nnattawat.github.io/flip/)

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/nnattawat/flip/master/dist/jquery.flip.min.js
[max]: https://raw.github.com/nnattawat/flip/master/dist/jquery.flip.js

or install using bower

<pre>bower install flip</pre>

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