
(function(){
	var methods = {
		initialize: function(options){
			  if (this.length === 0) {
		        $.error('galleryInfo initialized without DOM element');
		      }
		      if(options.backdrop && options.backdrop.footerTemplate && !options.engine){
		      	$.error('No template engine defined.');	
		      }
		      var settings = $.extend( { 'infoPosition' : 'left',
		      							 'backdrop': {
		      							 	'opacity' : 1
		      							 }
		      							 
									    }, options);
		      _createBackdrop(settings.backdrop,settings.engine);
		      return this.each(initialize);
		      function initialize(){
		      }
		      function _createBackdrop(bdOptions,engine){
				new Backdrop(bdOptions,engine);
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