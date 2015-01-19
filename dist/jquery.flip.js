/*! flip - v1.0.0 - 2015-01-19
* https://github.com/nnattawat/flip
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
(function( $ ) {
  var flip = function(dom, flipedRotate) {
    dom.data("fliped", true);
    dom.css({
      transform: flipedRotate
    });
  };

  var unflip = function(dom) {
    dom.data("fliped", false);
    dom.css({
      transform: "rotatex(0deg)"
    });
  };

  $.fn.flip = function(options) {
    this.each(function(){
      var $dom = $(this);

      if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
        if (options) {
          flip($dom, $dom.data("flipedRotate"));
        } else {
          unflip($dom);
        }
      } else { //Init flipable DOM
        var settings = $.extend({
          axis: "y",
          reverse: false,
          trigger: "click",
          speed: 500
        }, options );

        var prespective;
        var direction = settings.reverse? "-180deg" : "180deg";
        
        if (settings.axis.toLowerCase() == "x") {
          prespective = $dom.outerHeight() * 2;
          // save rotating css to DOM for manual flip
          $dom.data("flipedRotate", "rotatex(" + direction + ")");
        } else {
          prespective = $dom.outerWidth() * 2;
          $dom.data("flipedRotate", "rotatey(" + direction + ")");
        }
        var flipedRotate = $dom.data("flipedRotate");

        $dom.wrap("<div class='flip'></div>");
        $dom.parent().css({
          perspective: prespective,
          position: "relative",
          "margin-top": $dom.css("margin-top"),
          "margin-bottom": $dom.css("margin-bottom"),
          "margin-left": $dom.css("margin-left"),
          "margin-right": $dom.css("margin-right"),
          width: $dom.outerWidth(),
          height: $dom.outerHeight()
        });

        var speedInSec = settings.speed/1000 || 0.5;
        $dom.css({
          "transform-style": "preserve-3d",
          transition: "all " + speedInSec + "s ease-out",
          margin: '0px'
        });

        $dom.find(".front, .back").outerHeight($dom.height());
        $dom.find(".front, .back").outerWidth($dom.width());

        $dom.find(".front, .back").css({
          position: "absolute",
          "backface-visibility": "hidden"
        });

        $dom.find(".back").css({
          transform: flipedRotate
        });

        if (settings.trigger.toLowerCase() == "click") {
          $dom.find('button, a, input[type="submit"]').click(function (event) {
            event.stopPropagation();
          });

          $dom.click(function() {
            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom, flipedRotate);
            }
          });
        } else if (settings.trigger.toLowerCase() == "hover") {
          var performFlip = function() {
            $dom.unbind('mouseleave', performUnflip);

            flip($dom, flipedRotate);

            setTimeout(function() {
              $dom.bind('mouseleave', performUnflip);
              if (!$dom.is(":hover")) {
                unflip($dom);
              }
            }, (settings.speed+ 150));
          };

          var performUnflip = function() {
            unflip($dom);
          };

          $dom.mouseenter(performFlip);
          $dom.mouseleave(performUnflip);
        }
      }
    });

    return this;
  };
 
}( jQuery ));