/*!
 * jQuery 3D Flip v1.0
 * https://github.com/nnattawat/flip
 *
 * Copyright 2014, Nattawat Nonsung
 */

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
      var width = $dom.width();
      var height = $dom.height();
      var margin = $dom.css('margin');
      var prespective;

      if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
        if (options) {
          flip($dom, $dom.data("flipedRotate"));
        } else {
          unflip($dom);
        }
      } else { //Init flipable DOM
        var settings = $.extend({
          axis: "y",
          trigger: "click"
        }, options );

        if (settings.axis.toLowerCase() == "x") {
          prespective = height*2;
          // save rotating css to DOM for manual flip
          $dom.data("flipedRotate", "rotatex(180deg)");
        } else {
          prespective = width*2;
          $dom.data("flipedRotate", "rotatey(180deg)");
        }
        var flipedRotate = $dom.data("flipedRotate");

        $dom.wrap("<div class='flip'></div>");
        $dom.parent().css({
          perspective: prespective,
          position: "relative",
          width: width,
          height: height,
          margin: margin
        });

        $dom.css({
          "transform-style": "preserve-3d",
          transition: "all 0.5s ease-out"
        });

        $dom.find(".front").wrap("<div class='front-wrap'></div>");
        $dom.find(".back").wrap("<div class='back-wrap'></div>");

        $dom.find(".front, .back").css({
          width: "100%",
          height: "100%",
          display: 'inline-table'
        });

        $dom.find(".front-wrap, .back-wrap").css({
          position: "absolute",
          "backface-visibility": "hidden",
          width: "100%",
          height: "100%"
        });

        $dom.find(".back-wrap").css({
          transform: flipedRotate
        });

        if (settings.trigger.toLowerCase() == "click") {
          $dom.parent().click(function() {
            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom, flipedRotate);
            }
          });
        } else if (settings.trigger.toLowerCase() == "hover") {
          $dom.parent().hover(function() {
            flip($dom, flipedRotate);
          }, function() {
            unflip($dom);
          });
        }
      }
    });

    return this;
  };
 
}( jQuery ));