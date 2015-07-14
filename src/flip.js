(function( $ ) {
  var flip = function($dom) {
    $dom.data("flipped", true);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find($dom.data("front")).css({
      transform: rotateAxis + ($dom.data("reverse") ? "(-180deg)" : "(180deg)"),
      "z-index": "0"
    });

    $dom.find($dom.data("back")).css({
      transform: rotateAxis + "(0deg)",
      "z-index": "1"
    });
  };

  var unflip = function($dom) {
    $dom.data("flipped", false);

    var rotateAxis = "rotate" + $dom.data("axis");
    $dom.find($dom.data("front")).css({
      transform: rotateAxis + "(0deg)",
      "z-index": "1"
    });

    $dom.find($dom.data("back")).css({
      transform: rotateAxis + ($dom.data("reverse") ? "(180deg)" : "(-180deg)"),
      "z-index": "0"
    });
  };
  // Function from David Walsh: http://davidwalsh.name/css-animation-callback licensed with http://opensource.org/licenses/MIT
  var whichTransitionEvent = function(){
    var t,
        el = document.createElement("fakeelement"),
		transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  };
  $.fn.flip = function(options, callback) {
    if (typeof options == 'function'){
      //This allows flip to be called for setup with only a callback (default settings)
      callback = options;
    }
    this.each(function(){
      var $dom = $(this);

        if (options !== undefined && (typeof(options) == "boolean" || typeof(options) == "string")) { // Force flip the DOM
          if (options == "toggle"){
            options = !$dom.data("flipped");
          }
          if (options) {
            flip($dom);
          } else {
            unflip($dom);
          }
          //Providing a nicely wrapped up callback because transform is essentially async
          if (callback !== undefined){
           $(this).one(whichTransitionEvent(), callback);
          }
        } else if (!$dom.data("initiated")){ //Init flipable DOM
          $dom.data("initiated", true);

          var settings = $.extend({
            axis: "y",
            reverse: false,
            trigger: "click",
            speed: 500,
            forceHeight: false,
            forceWidth: false,
            autoSize: true,
            front: 'auto',
            back: 'auto'
          }, options );

          //By defualt we first check for the old front and back selectors for backward compatibility
          //if they arent there we fall back to auto selecting the first and second div
          if (settings.front == "auto"){
            settings.front = ($dom.find('.front').length > 0)? '.front' : 'div:first-child';
          }else if (settings.front == "autostrict"){
            settings.front = 'div:first-child';
          }
          if (settings.back == "auto"){
            //Note, we must use the old 'div:first-child + div' for IE compatibility
            settings.back = ($dom.find('.back').length > 0)? '.back' : 'div:first-child + div';
          }else if (settings.back == "autostrict"){
            settings.back = 'div:first-child + div';
          }
          // save reverse and axis css to DOM for performing flip
          $dom.data("reverse", settings.reverse);
          $dom.data("axis", settings.axis);
          $dom.data("front", settings.front);
          $dom.data("back", settings.back);

          var rotateAxis = "rotate" + (settings.axis.toLowerCase() == "x" ? "x" : "y"), 
              perspective = $dom["outer" + (rotateAxis == "rotatex" ? "Height" : "Width")]() * 2;

          $dom.find($dom.data("back")).css({
            transform: rotateAxis + "(" + (settings.reverse? "180deg" : "-180deg") + ")"
          });

          $dom.css({
            perspective: perspective,
            position: "relative"
          });

          var speedInSec = settings.speed / 1000 || 0.5;
          var faces = $dom.find(settings.front).add(settings.back, $dom);
          if (settings.forceHeight) {faces.outerHeight($dom.height());} else if (settings.autoSize) {faces.css({'height': '100%'});}
          if (settings.forceWidth) {faces.outerWidth($dom.width());} else if (settings.autoSize) {faces.css({'width': '100%'});}
          faces.css({
            "backface-visibility": "hidden",
            "transform-style": "preserve-3d",
            position: "absolute",
            "z-index": "1"
          });
          $dom.find($dom.data("back")).css({
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
            if (callback !== undefined){
              callback.call(this);
            }
          //While this used to work with a setTimeout of zero, at some point that became
          //unstable and the initial flip returned. The reason for this is unknown but we
          //will temporarily use a short delay of 20 to mitigate this issue. 
          }, 20);

          if (settings.trigger.toLowerCase() == "click") {
            $dom.on($.fn.tap ? "tap" : "click", function(event) {
              if( !event ) event = window.event; 
              if ($dom.find($(event.target).closest('button, a, input[type="submit"]')).length) {
                return;
              }

              if ($dom.data("flipped")) {
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
        }else{
          //The element has been initiated, all we have to do is change applicable settings
          if (options.axis !== undefined){
            setAxis.call(this,options.axis,callback);
          }
      }
    });

    return this;
  };
  var setAxis = function(axis,callback){
    if ($(this).data("axis") != axis.toLowerCase()){
      var faces = $(this).find($(this).data("front")).add($(this).data("back"), $(this));
      var savedTrans = faces.css("transition");
      faces.css({
        transition: "none"
      });
      //Only setting the axis if it needs to be

      axis = axis.toLowerCase();
      $(this).data("axis", axis);

      //This sets up the first flip in the new direction automatically
      var rotateAxis = "rotate" + axis;
      if ($(this).data("flipped")){
        $(this).find($(this).data("front")).css({
          transform: rotateAxis + ($(this).data("reverse") ? "(-180deg)" : "(180deg)"),
          "z-index": "0"
        });
      }else{
        $(this).find($(this).data("back")).css({
          transform: rotateAxis + "(" + ($(this).data("reverse")? "180deg" : "-180deg") + ")",
          "z-index": "0"
        });
      }
      //Providing a nicely wrapped up callback because transform is essentially async
      setTimeout(function(){
        faces.css({
          transition: savedTrans
        });
        if (callback !== undefined){
          callback.call(this);
        }
      },0);
    }else{
      //If we didnt have to set the axis we can just call back.
      if (callback !== undefined){
        setTimeout(callback.bind(this), 0);
      }
    }
  };
}( jQuery ));