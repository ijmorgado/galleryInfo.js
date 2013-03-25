
var Modal_View = (function(){
	var html = {
			wrapperGallery: '<div id="ui-giModalGallery"></div>',
			imageDiv: '<div id="ui-giImageDiv"></div>',
			infoDiv: '<div id="ui-giInfoDiv"></div>'
	};
	var css = {
		wrapperGallery: {
			margin: '40px'
		},
		imageDiv: {
			border: '1px solid #181818',
			display: 'inline-block'
		},
		infoDiv: {
			backgroundColor: '#FFFFFF',
			width: '275',
			display: 'inline-block',
			marginLeft: '23px'
		}
	};

	function Modal_View(){
		this._setDimensions();
		$wrapper = $(html.wrapperGallery).css(css.wrapperGallery);
		$imageDiv = $(html.imageDiv).css(css.imageDiv);
		$infoDiv = $(html.infoDiv).css(css.infoDiv);
		$wrapper.append($imageDiv);
		$wrapper.append($infoDiv);
		$("div.ui-giBackdrop").append($wrapper);
	}
	$.extend(Modal_View.prototype,{
		_setDimensions: function(){
			css.wrapperGallery.width = $(window).width()-80;
			css.wrapperGallery.height = $(window).height()-150;
			css.imageDiv.width = css.wrapperGallery.width - 300;
			css.imageDiv.height = css.wrapperGallery.height;
			css.infoDiv.height = css.wrapperGallery.height;
		}
	});
	return Modal_View;
})();