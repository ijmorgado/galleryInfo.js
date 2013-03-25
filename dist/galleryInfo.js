/*!
 * galleryInfo.js 0.0.1
 * https://github.com/ijmorgado/galleryInfo
 */

(function($) {
    var VERSION = "0.0.1";
    var Backdrop = function() {
        var html = {
            wrapper: '<div class="ui-giBackdrop"></div>',
            footer: '<div class="ui-giFooterBackdrop"></div>'
        }, css = {
            wrapper: {
                position: "fixed",
                backgroundColor: "#000",
                bottom: "0",
                left: "0",
                overflow: "hidden",
                position: "fixed",
                right: "0",
                top: "0",
                zIndex: "1099"
            },
            footer: {
                background: "#0a0a0a",
                borderTop: "1px solid #181818",
                bottom: "0",
                height: "70",
                minWidth: "640",
                position: "fixed",
                width: "100%",
                zIndex: "110"
            }
        };
        function Backdrop(opacity, footer) {
            css.wrapper.opacity = opacity;
            $backdrop = $(html.wrapper).css(css.wrapper);
            $footer = $(html.footer).css(css.footer);
            if (footer) {
                this._createFooterTemplate(footer);
            }
            $backdrop.append($footer);
            $("body").append($backdrop);
        }
        $.extend(Backdrop.prototype, {
            _createFooterTemplate: function(footer) {
                console.log(typeof footer);
                if (typeof footer === "string") {
                    $footer.html(footer);
                } else {
                    $footer.append(footer);
                }
            }
        });
        return Backdrop;
    }();
    var Modal_View = function() {
        var html = {
            wrapperGallery: '<div id="ui-giModalGallery"></div>',
            imageDiv: '<div id="ui-giImageDiv"></div>',
            infoDiv: '<div id="ui-giInfoDiv"></div>'
        };
        var css = {
            wrapperGallery: {
                margin: "40px"
            },
            imageDiv: {
                border: "1px solid #181818",
                display: "inline-block"
            },
            infoDiv: {
                backgroundColor: "#FFFFFF",
                width: "275",
                display: "inline-block",
                marginLeft: "23px"
            }
        };
        function Modal_View() {
            this._setDimensions();
            $wrapper = $(html.wrapperGallery).css(css.wrapperGallery);
            $imageDiv = $(html.imageDiv).css(css.imageDiv);
            $infoDiv = $(html.infoDiv).css(css.infoDiv);
            $wrapper.append($imageDiv);
            $wrapper.append($infoDiv);
            $("div.ui-giBackdrop").append($wrapper);
        }
        $.extend(Modal_View.prototype, {
            _setDimensions: function() {
                css.wrapperGallery.width = $(window).width() - 80;
                css.wrapperGallery.height = $(window).height() - 150;
                css.imageDiv.width = css.wrapperGallery.width - 300;
                css.imageDiv.height = css.wrapperGallery.height;
                css.infoDiv.height = css.wrapperGallery.height;
            }
        });
        return Modal_View;
    }();
    (function() {
        var methods = {
            initialize: function(options) {
                if (this.length === 0) {
                    $.error("galleryInfo initialized without DOM element");
                }
                var settings = $.extend({
                    infoPosition: "left",
                    backdropOpacity: 1,
                    footerContent: null
                }, options);
                _createBackdrop(settings.backdropOpacity, settings.footerContent);
                _createModalGallery();
                return this.each(initialize);
                function initialize() {}
                function _createModalGallery() {
                    new Modal_View();
                }
                function _createBackdrop(opacity, footer) {
                    new Backdrop(opacity, footer);
                }
            },
            destroy: function() {}
        };
        jQuery.fn.galleryInfo = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
    })();
})(window.jQuery);