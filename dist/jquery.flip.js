/*! flip - v1.0.0 - 2015-04-04
* https://github.com/nnattawat/flip
* Copyright (c) 2015 Nattawat Nonsung; Licensed MIT */
(function( $ ) {
  var flip = function($dom) {
    $dom.data("fliped", true);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)")
    });

    $dom.find(".back").css({
      transform: rotateAxis + "(0deg)"
    });
  };

  var unflip = function($dom) {
    $dom.data("fliped", false);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find(".front").css({
      transform: rotateAxis + "(0deg)"
    });

    $dom.find(".back").css({
      transform: rotateAxis + ($dom.data("reverse") ? "(180deg)" : "(-180deg)")
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
          speed: 500
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
        $dom.find(".front, .back")
          .outerHeight($dom.height())
          .outerWidth($dom.width())
          .css({
            "transform-style": "preserve-3d",
            position: "absolute",
            transition: "all " + speedInSec + "s ease-out",
            "backface-visibility": "hidden"
          });


        if (settings.trigger.toLowerCase() == "click") {
          $dom.find('button, a, input[type="submit"]').click(function (event) {
            event.stopPropagation();
          });

          $dom.click(function() {
            if ($dom.data("fliped")) {
              unflip($dom);
            } else {
              flip($dom);
            }
          });
        } else if (settings.trigger.toLowerCase() == "hover") {
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
        });
      }else{
        $dom.find(".back").css({
          transform: rotateAxis + "(" + ($dom.data("reverse")? "180deg" : "-180deg") + ")",
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