(function( $ ) {
  /*
   * Private attributes and method
   */

  // Function from David Walsh: http://davidwalsh.name/css-animation-callback licensed with http://opensource.org/licenses/MIT
  var whichTransitionEvent = function() {
    var t, el = document.createElement("fakeelement"),
    transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  };

  var Flip = function($el, options, callback) {
    // Define default setting
    var setting = $.extend({
      axis: "y",
      reverse: false,
      trigger: "click",
      speed: 500,
      forceHeight: false,
      forceWidth: false,
      autoSize: true,
      front: '.front',
      back: '.back'
    }, options );

    // Attributes
    this.setting = $.extend(setting, options);
    this.element = $el;
    this.frontElement = this.getFrontElement();
    this.backElement = this.getBackElement();
    if (typeof options === 'function') {
      // This allows flip to be called for setup with only a callback (default settings)
      callback = options;
    }
    this.callback = callback;
    this.isFlipped = false;

    this.init();
  };

  /*
   * Public methods
   */
  $.extend(Flip.prototype, {

    triggerCallback: function() {
      var self = this;
      // Providing a nicely wrapped up callback because transform is essentially async
      self.element.one(whichTransitionEvent(), function() {
        self.element.trigger('flip:done');
        if (self.callback !== undefined) {
          self.callback.call(self.element);
        }
      });
    },

    flip: function() {
      if (this.isFlipped) {
        return;
      }

      this.isFlipped = true;

      var rotateAxis = "rotate" + this.setting.axis;
      this.frontElement.css({
        transform: rotateAxis + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
        "z-index": "0"
      });

      this.backElement.css({
        transform: rotateAxis + "(0deg)",
        "z-index": "1"
      });
      this.triggerCallback();
    },

    unflip: function() {
      if (!this.isFlipped) {
        return;
      }

      this.isFlipped = false;

      var rotateAxis = "rotate" + this.setting.axis;
      this.frontElement.css({
        transform: rotateAxis + "(0deg)",
        "z-index": "1"
      });

      this.backElement.css({
        transform: rotateAxis + (this.setting.reverse ? "(180deg)" : "(-180deg)"),
        "z-index": "0"
      });
      this.triggerCallback();
    },

    getFrontElement: function() {
      if (this.setting.front instanceof $) {
        return this.setting.front;
      } else {
        return this.element.find(this.setting.front);
      }
    },

    getBackElement: function() {
      if (this.setting.back instanceof $) {
        return this.setting.back;
      } else {
        return this.element.find(this.setting.back);
      }
    },

    init: function() {
      var self = this;

      var faces = self.frontElement.add(self.backElement);
      var rotateAxis = "rotate" + (self.setting.axis.toLowerCase() == "x" ? "x" : "y");
      var perspective = self.element["outer" + (rotateAxis == "rotatex" ? "Height" : "Width")]() * 2;
      var elementCss = {
        'perspective': perspective,
        'position': 'relative'
      };
      var backElementCss = {
        "transform": rotateAxis + "(" + (self.setting.reverse ? "180deg" : "-180deg") + ")",
        "z-index": "0"
      };
      var faceElementCss = {
        "backface-visibility": "hidden",
        "transform-style": "preserve-3d",
        "position": "absolute",
        "z-index": "1"
      };

      if (self.setting.forceHeight) {
        faces.outerHeight(self.element.height());
      } else if (self.setting.autoSize) {
        faceElementCss['height'] = '100%';
      }

      if (self.setting.forceWidth) {
        faces.outerWidth(self.element.width());
      } else if (self.setting.autoSize) {
        faceElementCss['width'] = '100%';
      }

      // Back face always visible on Chrome #39
      if ((window.chrome || (window.Intl && Intl.v8BreakIterator)) && 'CSS' in window) {
        //Blink Engine, add preserve-3d to self.element
        elementCss["-webkit-transform-style"] = "preserve-3d";
      }

      self.element.css(elementCss);
      self.backElement.css(backElementCss);
      faces.css(faceElementCss).find('*').css({
        "backface-visibility": "hidden"
      });

      // #39
      // not forcing width/height may cause an initial flip to show up on
      // page load when we apply the style to reverse the backface...
      // To prevent self we first apply the basic styles and then give the
      // browser a moment to apply them. Only afterwards do we add the transition.
      setTimeout(function() {
        // By now the browser should have applied the styles, so the transition
        // will only affect subsequent flips.
        var speedInSec = self.setting.speed / 1000 || 0.5;
        faces.css({
          "transition": "all " + speedInSec + "s ease-out"
        });

        if (self.callback !== undefined) {
          self.callback.call(self.element);
        }

        // While this used to work with a setTimeout of zero, at some point that became
        // unstable and the initial flip returned. The reason for this is unknown but we
        // will temporarily use a short delay of 20 to mitigate this issue. 
      }, 20);

      self.attachEvents();
    },

    clickHandler: function(event) {
      if (!event) { event = window.event; }
      if (this.element.find($(event.target).closest('button, a, input[type="submit"]')).length) {
        return;
      }

      if (this.isFlipped) {
        this.unflip();
      } else {
        this.flip();
      }
    },

    hoverHandler: function() {
      var self = this;
      self.element.off('mouseleave.flip');

      self.flip();

      setTimeout(function() {
        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
        if (!self.element.is(":hover")) {
          self.unflip();
        }
      }, (self.setting.speed + 150));
    },

    attachEvents: function() {
      var self = this;
      if (self.setting.trigger.toLowerCase() === "click") {
        self.element.on($.fn.tap ? "tap.flip" : "click.flip", $.proxy(self.clickHandler, self));
      } else if (self.setting.trigger.toLowerCase() === "hover") {
        self.element.on('mouseenter.flip', $.proxy(self.hoverHandler, self));
        self.element.on('mouseleave.flip', $.proxy(self.unflip, self));
      }
    },

    // TODO Fix this method
    // changeSettings: function(options, callback) {
    //   var changeNeeded = false;
    //   if (options.axis !== undefined && this.setting.axis != options.axis.toLowerCase()) {
    //     $(this).data("axis", options.axis.toLowerCase());
    //     changeNeeded = true;
    //   }

    //   if (options.reverse !== undefined && this.setting.reverse != options.reverse) {
    //     $(this).data("reverse", options.reverse);
    //     changeNeeded = true;
    //   }

    //   if (changeNeeded) {
    //     var faces = $(this).find(this.setting.front).add(this.setting.back, $(this));
    //     var savedTrans = faces.css(["transition-property", "transition-timing-function", "transition-duration", "transition-delay"]);
    //     faces.css({
    //       transition: "none"
    //     });

    //     // Only setting the axis if it needs to be
    //     // options.axis = options.axis.toLowerCase();
    //     // $(this).data("axis", options.axis);

    //     // This sets up the first flip in the new direction automatically
    //     var rotateAxis = "rotate" + this.setting.axis;
    //     if ($(this).data("flipped")) {
    //       $(this).find(this.setting.front).css({
    //         transform: rotateAxis + (this.setting.reverse ? "(-180deg)" : "(180deg)"),
    //         "z-index": "0"
    //       });
    //     } else {
    //       $(this).find(this.setting.back).css({
    //         transform: rotateAxis + "(" + ($(this).data("reverse")? "180deg" : "-180deg") + ")",
    //         "z-index": "0"
    //       });
    //     }
    //     // Providing a nicely wrapped up callback because transform is essentially async
    //     setTimeout(function() {
    //       faces.css(savedTrans);
    //       callback.call(this);
    //     }.bind(this),0);
    //   } else {
    //     // If we didnt have to set the axis we can just call back.
    //     setTimeout(callback.bind(this), 0);
    //   }
    // }
  });

  /*
   * jQuery collection methods
   */
  $.fn.flip = function (options, callback) {
    if (typeof options === "string" || typeof options === "boolean") {
      this.each(function() {
        var flip = $(this).data('flip-model');

        if (options === "toggle") {
          options = !flip.isFlipped;
        }

        if (options) {
          flip.flip();
        } else {
          flip.unflip();
        }
      });
    } else {
      this.each(function() {
        if ($(this).data('flip-model')) { // The element has been initiated, all we have to do is change applicable settings
          var flip = $(this).data('flip-model');

          if (options && (options.axis !== undefined || options.reverse !== undefined)) {
            flip.changeSettings(options, function() {
              flip.element.trigger('flip:change');
              if (flip.callback !== undefined) {
                flip.callback.call(flip.element);
              }
            });
          }
        } else { // Init
          $(this).data('flip-model', new Flip($(this), options, callback));
        }
      });
    }

    return this;
  };

}( jQuery ));
