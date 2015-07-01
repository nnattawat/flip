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

      if (options !== undefined && (typeof(options) == "boolean" || typeof(options) == "string")) { // Force flip the DOM
        if (options == "toggle"){
          options = !$dom.data("fliped");
        }
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
  $.fn.setAxis = function(axis,callback){
    var $dom = $(this);
    if ($dom.data("axis") != axis.toLowerCase()){
      //Only setting the axis if it needs to be

      axis = axis.toLowerCase();
      $dom.data("axis", axis);

      //This sets up the first flip in the new direction automatically
      var rotateAxis = "rotate" + axis;
      if ($dom.data("fliped")){
        $dom.find(".front").css({
          transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)"),
          "z-index": "0"
        });
      }else{
        $dom.find(".back").css({
          transform: rotateAxis + "(" + ($dom.data("reverse")? "180deg" : "-180deg") + ")",
          "z-index": "0"
        });
      }

      //Providing a nicely wrapped up callback because transform is essentially async
      if (callback !== undefined){
       $dom.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        callback();
        $dom.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");
       });
      }
    }else{
      //If we didnt have to set the axis we can just call back.
      if (callback !== undefined){
        callback();
      }
    }
  };
  //Short cut function for setting a new axis and toggling automatically
  $.fn.setAndFlip = function(axis){
    var $dom = $(this);
    $dom.setAxis(axis,function(){
      $dom.flip("toggle");
    });
  };
}( jQuery ));