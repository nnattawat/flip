(function( $ ) {
  var flip = function($dom) {
    $dom.data("fliped", true);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)"),
      "z-index": "0"
    });

    $dom.find(".back").css({
      transform: rotateAxis + "(0deg)",
      "z-index": "1"
    });
  };

  var unflip = function($dom) {
    $dom.data("fliped", false);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + "(0deg)",
      "z-index": "1"
    });

    $dom.find(".back").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(180deg)" : "(-180deg)"),
      "z-index": "0"
    });
  };

  $.fn.flip = function(options) {
    this.each(function(){
      var $dom = $(this);

      if (options !== undefined && typeof(options) == "boolean") { // Force flip the DOM
        if (options) {
          flip($dom);
        } else {
          unflip($dom);
        }
      } else { //Init flipable DOM
        var settings = $.extend({
          axis: "y",
          reverse: false,
          trigger: "click",
          speed: 500,
          forceHeight: false,
          forceWidth: false
        }, options );
        
        // save reverse and axis css to DOM for performing flip
        $dom.data("reverse", settings.reverse);
        $dom.data("axis", settings.axis);

        if (settings.axis.toLowerCase() == "x") {
          var prespective = $dom.outerHeight() * 2;
          var rotateAxis = "rotatex";
        } else {
          var prespective = $dom.outerWidth() * 2;
          var rotateAxis = "rotatey";
        }

        $dom.find(".back").css({
          transform: rotateAxis + "(" + (settings.reverse? "180deg" : "-180deg") + ")"
        });

        $dom.css({
          perspective: prespective,
          position: "relative"
        });

        var speedInSec = settings.speed / 1000 || 0.5;
        var faces = $dom.find(".front, .back"); 
        if (settings.forceHeight) faces.outerHeight($dom.height());
        if (settings.forceWidth) faces.outerWidth($dom.width())
        faces.css({
          "backface-visibility": "hidden",
          "transform-style": "preserve-3d",
          position: "absolute",
          "z-index": "1"
        });
        $dom.find(".back").css({
          transform: rotateAxis + "(" + (settings.reverse? "180deg" : "-180deg") + ")",
          "z-index": "0"
        });
        // not forcing width/height may cause an initial flip to show up on
        // page load when we apply the style to reverse the backface... 
        // To prevent this we first apply the basic styles and then give the
        // browser a moment to apply them. Only afterwards do we add the transition.
        setTimeout(function(){
          // By now the browser should have applied the styles, so the transition
          // will only affect subsequent flips.
          faces.css({
            transition: "all " + speedInSec + "s ease-out"
          });
        }, 0);
        
        if (settings.trigger.toLowerCase() == "click") {
          $dom.click(function() {
            if ($dom.find($(event.target).closest('button, a, input[type="submit"]')).length) 
              return;

            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom);
            }
          });
        }
        else if (settings.trigger.toLowerCase() == "hover") {
          var performFlip = function() {
            $dom.unbind('mouseleave', performUnflip);

            flip($dom);

            setTimeout(function() {
              $dom.bind('mouseleave', performUnflip);
              if (!$dom.is(":hover")) {
                unflip($dom);
              }
            }, (settings.speed + 150));
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