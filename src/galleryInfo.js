
(function(){
	var methods = {
		initialize: function(options){
			var $that = $(this);
			  if (this.length === 0) {
		        $.error('galleryInfo initialized without DOM element');
		      }
		      var settings = $.extend( { 'infoPosition' : 'left',
		      							 'backdropOpacity': 1,
		      							 'footerContent': null
									    }, options),time = new Date().getTime();
		      if(!$('#ui-giModal'+time).length){
				_createBackdrop(settings.backdropOpacity,settings.footerContent,time);
		      }
		      return $(this).children('.ui-giItem').each(initialize);
		      function initialize(){
		      	$galleryItem = $(this);
		      	$that.on('click.gi-gallery','.ui-giItem',_openGallery);
		      }
		      function _createBackdrop(opacity,footer,time){
				new Backdrop(opacity,footer,time);
			  }
			  function _openGallery(e){
			  	e.preventDefault();
			  	$gallery = $('#ui-giModal'+time);
			  	if($gallery.length){
			  		$gallery.show();
			  	}
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