# jQuery Flip <sub><sup>v1.0.18</sup></sub>

**A lightweight jQuery plugin to create 3d flip animation.** 
See the [project page](http://nnattawat.github.io/flip/)

## What's new
* **Flip v1.0.18**
  * Fixed [Missing comma in package.json #64](https://github.com/nnattawat/flip/issues/64)
  * Thanks to [Zlatko Fedor](https://github.com/seeden) for reporting and fixing this!

* **Flip v1.0.17**
  * Fixed [Missing "main" and "ignore" entry in bower.json #50](https://github.com/nnattawat/flip/issues/50)
  * Fixed [Use jQuery ~2.0 in bower.json #51](https://github.com/nnattawat/flip/issues/51)
  * Thanks to [Razvan Popa](https://github.com/VholtWCP) for reporting and fixing these!

* **Flip v1.0.16**
  * Made Flip [Idempotent](https://en.wikipedia.org/wiki/Idempotence), meaning it won't hurt if you call it more than once on the same element. Fixes [Not working after ajax refresh #40](https://github.com/nnattawat/flip/issues/40).
  * Fixed a rendering glitch in Chrome and Opera. [Back face always visible on Chrome #39](https://github.com/nnattawat/flip/issues/39).

* **Flip v1.0.15**
  * [Hid backface for all children, fixing #31](https://github.com/nnattawat/flip/commit/0ac07a7e2da3d9b096b48810e5dbdf33d041962f)

* **Flip v1.0.14**
  * [Added missing jQuery dependency](https://github.com/nnattawat/flip/commit/0c913304c2b9f86099cb7a2b7fd6ea408297655c)
  * [Fixed scoping issues](https://github.com/nnattawat/flip/commit/f1ce8f6a313fe905193cae22668dbced0d246451)
  * [Added support for jquery event](https://github.com/nnattawat/flip/commit/780ab0322862a3626ca7732461423e67c76569d1)

* **Flip v1.0.13**
  * [Added ability to change 'reverse' dynamically](https://github.com/nnattawat/flip/commit/a047b24569abd3e5357255a6b143781f91356af0)

* **Flip v1.0.12**
  * [v1.0.11 Not working in Firefox](https://github.com/nnattawat/flip/issues/28)
  * [Simplified callback](https://github.com/download/flip/commit/f3378c7513ea086623b01b1bfb16706731ee8a1b)
  
* **Flip v1.0.11**
  * [Added a callback that fires when flip animation is finished](https://github.com/Download/flip/commit/61b57a3d6c9a8f0dd116ca5b4444cb5356374702)

* **Flip v1.0.10**
  * [Removed log statement](https://github.com/Download/flip/commit/60a0df340b17036978a9b26b23be71204755c928)
  * [Updated license and credits](https://github.com/Download/flip/commit/9b8d218506f6b279d04a52642a8ca2fd9455d9b4)
  * [Fixed indentation](https://github.com/Download/flip/commit/acc64f52e176e7fdb5124b797b4d28cdc5bedf95)

* **Flip v1.0.9**
  * [Added support for custom front/back face selectors #27](https://github.com/nnattawat/flip/issues/27)

* **Flip v1.0.8**
  * [Added support for the mobile `tap` event](https://github.com/nnattawat/flip/issues/26)
  * [Dynamic sized content by default while maintaining backward compatibility](https://github.com/Download/flip/commit/8a6d1b3626a3c1e0e5d71fb4786c44244bf33eac)
  * Now available with [source map](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) for better debugging support.

* **Flip v1.0.7**
  * [Improved backward compatibility](https://github.com/Download/flip/commit/b27588b1e5340ec2a6bfc5afca80a6e52b6f833f)

* **Flip v1.0.6**
  This version adds new features and fixes some issues compared to the original flip:
  * [Added support for flippable content with dynamic height/width #17](https://github.com/nnattawat/flip/issues/17)
  * [Added ability to change axis arbitrarily #1](https://github.com/download/flip/pull/1)
  * [Flip prevents bubbling of click on 'button, a, input[type="submit"], breaking e.g. Swipebox #14](https://github.com/nnattawat/flip/issues/14)
  * [Flickering animations of elements in flipped content. #16](https://github.com/nnattawat/flip/issues/16)
 
* **Flip v1.0.2 - v1.0.5**
  Chaotic period of development culminating in v1.0.6 see above.

## Getting Started

### CDN
    https://cdn.rawgit.com/nnattawat/flip/v1.0.18/dist/jquery.flip.min.js

### Download 
* [jquery.flip.js][max] (development version, commented ~9kB)
* [jquery.flip.min.js][min] (production version, minified ~4kB, gzipped ~2kB)
* [jquery.flip.min.js.map][map] (source map, ~5kB)
[max]: https://cdn.rawgit.com/nnattawat/flip/v1.0.18/dist/jquery.flip.js
[min]: https://cdn.rawgit.com/nnattawat/flip/v1.0.18/dist/jquery.flip.min.js
[map]: https://cdn.rawgit.com/nnattawat/flip/v1.0.18/dist/jquery.flip.min.js.map

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
