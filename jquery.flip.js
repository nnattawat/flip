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

/*
* TODO: manaul trigger using flip(true); and flip(flase);
*/
(function( $ ) {
	var flip = function(dom, flipedRotate){
		if(dom.data("fliped") == undefined || dom.data("fliped") == false){
			console.log("flip");
			dom.data("fliped", true);
			dom.css({
				transform: flipedRotate
			});
		}
	};
	var unflip = function(dom){
		if(dom.data("fliped") == true){
			console.log("unflip");
			dom.data("fliped", false);
			dom.css({
				transform: "rotatey(0deg)"
			});
		}
	};
	var flipedRotate = "rotatey(-180deg)";

  $.fn.flip = function(options) {
    var width = this.width();
		var height = this.height();
		var prespective = width*2;

  	if(options && typeof(options) == "boolean"){ // Force flip the DOM
  		if(options){
  			flip(this, flipedRotate);
  		}else{
  			unflip(this);
  		}
  	}else{ //Init flipable DOM
  		// Define default setting
			var settings = $.extend({
				axis: "y",
				trigger: "click"
	    }, options );

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
			});

			this.find(".front").wrap("<div class='front-wrap'></div>");
			this.find(".back").wrap("<div class='back-wrap'></div>");

			this.find(".front, .back").css({
				width: "100%",
				height: "100%"
			});

			this.find(".front-wrap, .back-wrap").css({
				position: "absolute",
				"backface-visibility": "hidden",
				width: "100%",
				height: "100%"
			})

			this.find(".back-wrap").css({
				transform: flipedRotate
			})

			if(settings.trigger.toLowerCase() == "click"){
				var obj = this;
				this.parent().click(function(){
					if(obj.data("fliped")){
						unflip(obj);
		      }else{
		      	flip(obj, flipedRotate);
		      }
				});
			}else if(settings.trigger.toLowerCase() == "hover"){
				var obj = this;
				this.parent().hover(function(){
					flip(obj, flipedRotate);
				}, function(){
					unflip(obj);
				});
			}	
  	}
		// Return jQuery so that it's chainable 
		return this;		
  };
 
}( jQuery ));