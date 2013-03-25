
var Backdrop = (function(){
	var html = {
		wrapper : '<div class="ui-giBackdrop"></div>',
		footer: '<div class="ui-giFooterBackdrop"></div>'
	},
	css = {
		wrapper: {
			position: 'fixed',
			backgroundColor: '#000',
			bottom: '0',
			left: '0',
			overflow: 'hidden',
			position: 'fixed',
			right: '0',
			top: '0',
			zIndex: '1099'
		},
		footer: {	background: '#0a0a0a',
			borderTop: '1px solid #181818',
			bottom: '0',
			height: '70',
			minWidth: '640',
			position: 'fixed',
			width: '100%',
			zIndex: '110'

		}
	};
	function Backdrop(settings,engine){
		css.wrapper.opacity = settings.opacity;
		$backdrop = $(html.wrapper).css(css.wrapper);
		$footer = $(html.footer).css(css.footer);
		if(settings.footerTemplate){
			console.log("inside");
			this._createFooterTemplate($footer,settings.footerTemplate,engine);	
		}
		$backdrop.append($footer);
		$("body").append($backdrop);
	}
	$.extend(Backdrop.prototype,{
		_createFooterTemplate: function($wrapper,template,engine){
			if (template) {
      			compiledTemplate = engine.compile(template);
    		}
    		else {
      			compiledTemplate = {
      								  render: function() {
							          				return '';
							        			}
      							};
    		}
    		$wrapper.append(compiledTemplate.render());
		}
	});
	return Backdrop;
})();