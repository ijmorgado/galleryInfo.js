
(function(){
	var methods = {
		initialize: function(options){
			var $that = $(this);
			var modal;
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
		      	$(this).on('click.gi-gallery',{uniqueID:time},_openGallery);
		      }
		      function _createBackdrop(opacity,footer,time){
				modal = new Backdrop(opacity,footer,time);
			  }
			  function _openGallery(e){
			  	e.preventDefault();
			  	if(modal){
			  		modal.getModal().show($(this),e.data.uniqueID);
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