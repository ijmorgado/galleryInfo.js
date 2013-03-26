/*!
 * galleryInfo.js 0.0.1
 * https://github.com/ijmorgado/galleryInfo.js
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
            new Modal_View();
        }
        $.extend(Backdrop.prototype, {
            _createFooterTemplate: function(footer) {
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
            infoDiv: '<div id="ui-giInfoDiv"></div>',
            leftCtrl: '<div class="ui-giCtrl" id="ui-giCtrlleft"></div>',
            rightCtrl: '<div class="ui-giCtrl" id="ui-giCtrlRight"></div>',
            closeCtrl: '<span class="ui-giCtrl" id="ui-giCloseGallery"></span>'
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
                marginLeft: "23px",
                "-moz-border-radius": "2px",
                "-webkit-border-radius": "2px",
                borderRadius: "2px"
            },
            leftCtrl: {
                width: "40",
                height: "auto",
                position: "absolute",
                top: "40",
                cursor: "pointer",
                left: "0"
            },
            rightCtrl: {
                width: "40",
                height: "auto",
                position: "absolute",
                top: "40",
                cursor: "pointer",
                right: "0"
            },
            arrowLeft: {
                width: "20",
                height: "20",
                display: "inline-block",
                marginLeft: "10px",
                background: "url(dist/img/controls.png) -55px 0px"
            },
            arrowRight: {
                width: "20",
                height: "20",
                display: "inline-block",
                marginLeft: "10px",
                background: "url(dist/img/controls.png) -38px 0px"
            },
            arrowLeftHover: {
                background: "url(dist/img/controls.png) -100px 0px"
            },
            arrowRightHover: {
                background: "url(dist/img/controls.png) -80px 0px"
            },
            closeCtrl: {
                width: "20",
                height: "20",
                display: "inline-block",
                background: "url(dist/img/controls.png) -20px 0px",
                position: "absolute",
                top: "15px",
                cursor: "pointer",
                right: "10px"
            },
            closeCtrlHover: {
                background: "url(dist/img/controls.png) 0px 0px"
            }
        };
        function Modal_View() {
            this._setDimensions();
            this._setStyle();
            this._createControls();
            that = this;
            $wrapper.append($imageDiv);
            $wrapper.append($infoDiv);
            $("div.ui-giBackdrop").append($wrapper);
            $(window).on("resize.gi-gallery", this._adjustToViewPort);
            $(".ui-giCtrl").on("mouseenter.gi-gallery mouseleave.gi-gallery", this._hoverControls);
        }
        $.extend(Modal_View.prototype, {
            _setDimensions: function() {
                css.wrapperGallery.width = $(window).width() - 80;
                css.wrapperGallery.height = $(window).height() - 150;
                css.imageDiv.width = css.wrapperGallery.width - 300;
                css.imageDiv.height = css.wrapperGallery.height;
                css.infoDiv.height = css.wrapperGallery.height;
                css.leftCtrl.height = css.wrapperGallery.height;
                css.rightCtrl.height = css.wrapperGallery.height;
                css.arrowRight.marginTop = css.wrapperGallery.height / 2 - 10 + "px";
                css.arrowLeft.marginTop = css.wrapperGallery.height / 2 - 10 + "px";
            },
            _setStyle: function() {
                $wrapper = $(html.wrapperGallery).css(css.wrapperGallery);
                $imageDiv = $(html.imageDiv).css(css.imageDiv);
                $infoDiv = $(html.infoDiv).css(css.infoDiv);
            },
            _updateStyle: function() {
                $("div#ui-giModalGallery").css(css.wrapperGallery);
                $("div#ui-giImageDiv").css(css.imageDiv);
                $("div#ui-giInfoDiv").css(css.infoDiv);
                $("div#ui-giCtrlleft").css(css.leftCtrl);
                $("div#ui-giCtrlRight").css(css.rightCtrl);
            },
            _createControls: function() {
                $spanArrowLeft = $(document.createElement("span")).css(css.arrowLeft);
                $spanArrowRight = $(document.createElement("span")).css(css.arrowRight);
                $leftCtrl = $(html.leftCtrl).css(css.leftCtrl).append($spanArrowLeft);
                $rightCtrl = $(html.rightCtrl).css(css.rightCtrl).append($spanArrowRight);
                $wrapper.append($leftCtrl).append($rightCtrl).append($(html.closeCtrl).css(css.closeCtrl));
            },
            _adjustToViewPort: function() {
                that._setDimensions();
                that._updateStyle();
            },
            _hoverControls: function(e) {
                if (e.type === "mouseenter") {
                    if ($(this).attr("id") === "ui-giCloseGallery") $(this).css(css.closeCtrlHover); else if ($(this).attr("id") === "ui-giCtrlleft") $(this).children("span").css(css.arrowLeftHover); else $(this).children("span").css(css.arrowRightHover);
                } else {
                    if ($(this).attr("id") === "ui-giCloseGallery") $(this).css(css.closeCtrl); else if ($(this).attr("id") === "ui-giCtrlleft") $(this).children("span").css(css.arrowLeft); else $(this).children("span").css(css.arrowRight);
                }
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
                return this.each(initialize);
                function initialize() {}
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