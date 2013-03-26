
(function(){
	var methods = {
		initialize: function(options){
			  if (this.length === 0) {
		        $.error('galleryInfo initialized without DOM element');
		      }
		      var settings = $.extend( { 'infoPosition' : 'left',
		      							 'backdropOpacity': 1,
		      							 'footerContent': null
									    }, options);
		      _createBackdrop(settings.backdropOpacity,settings.footerContent);
		      return this.each(initialize);
		      function initialize(){
		      }
		      function _createBackdrop(opacity,footer){
				new Backdrop(opacity, footer);
			  }
		},
		destroy: function(){
		}
	};
	jQuery.fn.galleryInfo = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, [].slice.call(arguments, 1));
    }
    else {
      return methods.initialize.apply(this, arguments);
    }
  };
})();