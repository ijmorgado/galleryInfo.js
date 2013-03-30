
var Modal_View = (function(){
	var html = {
			wrapperGallery: '<div class="ui-giModalGallery"></div>',
			imageDiv: '<div class="ui-giImageDiv"></div>',
			infoDiv: '<div class="ui-giInfoDiv"></div>',
			leftCtrl: '<div class="ui-giCtrl ui-giCtrlleft"></div>',
			rightCtrl: '<div class="ui-giCtrl ui-giCtrlRight"></div>',
			closeCtrl: '<span class="ui-giCtrl ui-giCloseGallery"></span>'
	};
	var css = {
		wrapperGallery: {
			margin: '40px'
		},
		imageDiv: {
			border: '1px solid #181818',
			display: 'inline-block',
			float: 'left'
		},
		infoDiv: {
			backgroundColor: '#FFFFFF',
			width: '275',
			display: 'inline-block',
			marginLeft: '23px',
			'-moz-border-radius': '2px',
			'-webkit-border-radius': '2px',
			borderRadius: '2px'
		},
		leftCtrl: {
			width: '40',
			height: 'auto',
			position: 'absolute',
			top: '40',
			cursor: 'pointer',
			left: '0'
		},
		rightCtrl: {
			width: '40',
			height: 'auto',
			position: 'absolute',
			top: '40',
			cursor: 'pointer',
			right: '0'
		},
		arrowLeft: {
			width: '20',
			height: '20',
			display: 'inline-block',
			marginLeft: '10px',
			background: 'url(dist/img/controls.png) -55px 0px'
		},
		arrowRight: {
			width: '20',
			height: '20',
			display: 'inline-block',
			marginLeft: '10px',
			background: 'url(dist/img/controls.png) -38px 0px'
		},
		arrowLeftHover: {
			background: 'url(dist/img/controls.png) -100px 0px'	
		},
		arrowRightHover: {
			background: 'url(dist/img/controls.png) -80px 0px'	
		},
		closeCtrl: {
			width: '20',
			height: '20',
			display: 'inline-block',
			background: 'url(dist/img/controls.png) -20px 0px',
			position: 'absolute',
			top: '15px',
			cursor: 'pointer',
			right: '10px'
		},
		closeCtrlHover: {
			background: 'url(dist/img/controls.png) 0px 0px',
		}
	};

	function Modal_View(uniqueID){
		this._setDimensions();
		this._setStyle();
		this._createControls();
		that = this;
		$wrapper.append($imageDiv);
		$wrapper.append($infoDiv);
		$("div#ui-giModal"+uniqueID).append($wrapper);
		$(window).on('resize.gi-gallery',this._adjustToViewPort);
		$('#ui-giModal'+uniqueID).on('mouseenter.gi-gallery mouseleave.gi-gallery',".ui-giCtrl",this._hoverControls);
		$('#ui-giModal'+uniqueID).on('click.gi-gallery',".ui-giCloseGallery",{uniqueID: uniqueID},this._hideModal);
	}
	$.extend(Modal_View.prototype,{
		_setDimensions: function(){
			css.wrapperGallery.width = $(window).width()-80;
			css.wrapperGallery.height = $(window).height()-150;
			css.imageDiv.width = css.wrapperGallery.width - 300;
			css.imageDiv.height = css.wrapperGallery.height;
			css.infoDiv.height = css.wrapperGallery.height;
			css.leftCtrl.height = css.wrapperGallery.height;
			css.rightCtrl.height = css.wrapperGallery.height;
			css.arrowRight.marginTop = css.wrapperGallery.height/2-10 + 'px';
			css.arrowLeft.marginTop = css.wrapperGallery.height/2-10 + 'px';
		},
		_setStyle: function(){
			$wrapper = $(html.wrapperGallery).css(css.wrapperGallery);
			$imageDiv = $(html.imageDiv).css(css.imageDiv);
			$infoDiv = $(html.infoDiv).css(css.infoDiv);
		},
		_updateStyle: function(){
			$("div.ui-giModalGallery").css(css.wrapperGallery);
			$("div.ui-giImageDiv").css(css.imageDiv);
			$("div.ui-giInfoDiv").css(css.infoDiv);
			$("div.ui-giCtrlleft").css(css.leftCtrl);
			$("div.ui-giCtrlRight").css(css.rightCtrl);
		},
		_createControls: function(){
			$spanArrowLeft = $(document.createElement('span')).css(css.arrowLeft);
			$spanArrowRight = $(document.createElement('span')).css(css.arrowRight);
			$leftCtrl = $(html.leftCtrl).css(css.leftCtrl).append($spanArrowLeft);
			$rightCtrl = $(html.rightCtrl).css(css.rightCtrl).append($spanArrowRight);
			$wrapper.append($leftCtrl).append($rightCtrl).append($(html.closeCtrl).css(css.closeCtrl));
		},
		_adjustToViewPort: function(){
			that._setDimensions();
			that._updateStyle();
		},
		_hoverControls: function(e){
			if(e.type === 'mouseenter'){
				if($(this).hasClass('ui-giCloseGallery'))
					$(this).css(css.closeCtrlHover);
				else if($(this).hasClass('ui-giCtrlleft'))
					$(this).children('span').css(css.arrowLeftHover);
				else
					$(this).children('span').css(css.arrowRightHover);	
			}else{
				if($(this).hasClass('ui-giCloseGallery'))
					$(this).css(css.closeCtrl);
				else if($(this).hasClass('ui-giCtrlleft'))
					$(this).children('span').css(css.arrowLeft);
				else
					$(this).children('span').css(css.arrowRight);	
			}
			
		},
		_hideModal: function(e){
			$('#ui-giModal'+e.data.uniqueID).fadeOut(200);
		},
		show: function($el,uniqueID){
			$imageContainer = $('#ui-giModal' + uniqueID+" .ui-giImageDiv");
			var image_url = $el.attr("href") || $el.data("href");
			this._prepareImage(image_url,$imageContainer);
		},
		_prepareImage: function(url,$imageContainer){
			doResize = this._doResize;
			imgEl = new Image_Processor(url,function(){
				resized_image = doResize(this,$imageContainer);
				if($imageContainer.contents().length > 0){
					$imageContainer.contents().replaceWith($(resized_image));	
				}else{
					$imageContainer.append($(resized_image));	
				}
				$imageContainer.parent().parent().show();
			});
		},
		_doResize: function(img,$imageContainer){
			return $(img);
		}
	});
	return Modal_View;
})();