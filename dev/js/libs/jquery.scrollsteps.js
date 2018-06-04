/*! Copyright (c) 2014 Arnaud Mondit (http://brindillesnomades.com)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 2.0.4
*
* Requires: jQuery 1.2.2+, jquery.mousescroll.js
*/

(function ($) {
	$.fn.scrollsteps = function (options) {

		var lastTransitionTime = 0;
		var lastScrollEventTime = 0;

		var defauts = {
			transitionDuration: 2000, // Duration of the main transition event,
			up: null, //callback for up event
			down: null, //callback for down event
			left: null, //callback for left event
			right: null, //callback for right event

			//Below, internal values tweaked for best support for all wheel types, tweak to your preference if you don't like default values
			quietPeriodBetweenTwoScrollEvents: 400, // Increases responsiveness, minimum delay between two quiet periods (no scroll events) to force the transition event if the transitionDuration is not completed.
		};

		$.extend(defauts, options);

		function performMouseScroll(e) {
			var deltaY = e.deltaY;
			var deltaX = e.deltaX;
			if (deltaX == undefined || deltaY == undefined) {
				console.log("Could not identify delta of scrolling, is the jQuery Mousescroll plugin present?");
				return;
			}
			var timeNow = new Date().getTime();

			if((timeNow - lastTransitionTime < defauts["transitionDuration"])){
				if((timeNow - lastScrollEventTime < defauts["quietPeriodBetweenTwoScrollEvents"])){
					e.preventDefault();
					lastScrollEventTime = timeNow;
					return;
				}
			}
			lastScrollEventTime = timeNow;
			e.preventDefault();
			if(deltaY !=0) {
				var dirY = deltaY > 0 ? 'up' : 'down';
				if (dirY == 'up') {
					//Scroll Up
					defauts["up"](e);
				} else {
					//Scroll Down
					defauts["down"](e);
				}
			}
			if(deltaX !=0) {
				var dirX = deltaX < 0 ? 'left' : 'right';
				if (dirX == 'left') {
					//Scroll left
					defauts["left"](e);
				} else {
					//Scroll right
					defauts["right"](e);
				}
			}
			lastTransitionTime = timeNow;
		}

		return this.each(function () {
			$(this).on("mousewheel", performMouseScroll);
		});
	};
})(jQuery);
