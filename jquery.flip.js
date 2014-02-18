/*!
 * jQuery 3D Flip v1.0
 * https://github.com/nnattawat/flip
 *
 * Copyright 2014, Nattawat Nonsung
 */


/**
* Use immediately Invoked Function Expression to
* - Prevent conflicting with other libary on alias $
* - Scope varaible to be private
*/
(function( $ ) {
  $.fn.flip = function(options) {

		// Define default setting
		var settings = $.extend({
			axis: "y"
    }, options );

    var flipedRotate = "rotatey(-180deg)";
    var width = this.width();
		var height = this.height();
		var prespective = width*2;

		if(settings.axis.toLowerCase() == "x"){
			flipedRotate = "rotatex(180deg)";
			prespective = height*2;
		}

		this.wrap("<div class='flip'></div>");
		this.parent().css({
			perspective: prespective,
			position: "relative",
			width: width,
			height: height
		});

		this.css({
			"transform-style": "preserve-3d",
			transition: "all 0.5s ease-out"
		})

		this.find(".front").wrap("<div class='front-wrap'></div>");
		this.find(".back").wrap("<div class='back-wrap'></div>");

		this.find(".front-wrap, .back-wrap").css({
			position: "absolute",
			"backface-visibility": "hidden",
			width: "100%",
			height: "100%",
		})

		this.find(".back-wrap").css({
			transform: flipedRotate
		})

		this.on("click", function(){
			if($(this).data("fliped")){
				$(this).data("fliped", false);
				$(this).css({
					transform: "rotatey(0deg)"
				});
      }else{
        $(this).data("fliped", true);
				$(this).css({
					transform: flipedRotate
				});
      }
		})
	
		// Return jQuery so that it's chainable 
		return this;		
  };
 
}( jQuery ));