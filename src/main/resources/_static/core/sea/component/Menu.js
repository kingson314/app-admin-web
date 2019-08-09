define(function(require, exports, module) {
	//require.async(("./css/menu.css");
	 (function($, window, document, undefined) {
	    var pluginName = "Menu";
	    var defaults = {
	        speed: 300,
	        showDelay: 0,
	        hideDelay: 0,
	        singleOpen: true,
	        clickEffect: false
	    };
	    function Plugin(element, options) {
	        this.element = element;
	        this.settings = $.extend({},defaults, options);
	        this._defaults = defaults;
	        this._name = pluginName;
	        this.init()
	    };
	    $.extend(Plugin.prototype, {
	        init: function() {
	            this.openSubmenu();
	            this.submenuIndicators();
	            if (this.settings.clickEffect) {
	                this.addClickEffect()
	            }
	        },
	        openSubmenu: function() {
	        	 var me=this;
	            $(this.element).children("ul").find("li").bind("click touchstart",
	            function(e) {
	                e.stopPropagation();
	                if ($(this).children(".sea_submenu").length > 0) {
	                    if ($(this).children(".sea_submenu").css("display") == "none") {
	                        $(this).children(".sea_submenu").delay(me.settings.showDelay).slideDown(me.settings.speed);
	                        $(this).children(".sea_submenu").siblings("a").addClass("sea_submenu_indicator_minus");
	                        if (me.settings.singleOpen) {
	                            $(this).siblings().children(".sea_submenu").slideUp(me.settings.speed);
	                            $(this).siblings().children(".sea_submenu").siblings("a").removeClass("sea_submenu_indicator_minus")
	                        }
	                        return false
	                    } else {
	                        $(this).children(".sea_submenu").delay(me.settings.hideDelay).slideUp(me.settings.speed)
	                    }
	                    if ($(this).children(".sea_submenu").siblings("a").hasClass("sea_submenu_indicator_minus")) {
	                        $(this).children(".sea_submenu").siblings("a").removeClass("sea_submenu_indicator_minus")
	                    }
	                }else{
	                	$(".sea_menu .sea_submenu_active").removeClass("sea_submenu_active");
	                	$(this).addClass("sea_submenu_active");//.siblings().removeClass("sea_submenu_active");
	                }
	            })
	        },
	        submenuIndicators: function() {
	            if ($(this.element).find(".sea_submenu").length > 0) {
	                $(this.element).find(".sea_submenu").siblings("a").append("<span class='sea_submenu_indicator'>+</span>")
	            }
	        },
	        addClickEffect: function() {
	            var sea_ink, d, x, y;
	            $(this.element).find("a").bind("click touchstart",
	            function(e) {
	                $(".sea_ink").remove();
	                if ($(this).children(".sea_ink").length === 0) {
	                    $(this).prepend("<span class='sea_ink'></span>")
	                }
	                sea_ink = $(this).find(".sea_ink");
	                sea_ink.removeClass("sea_animate_ink");
	                if (!sea_ink.height() && !sea_ink.width()) {
	                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
	                    sea_ink.css({
	                        height: d,
	                        width: d
	                    })
	                }
	                x = e.pageX - $(this).offset().left - sea_ink.width() / 2;
	                y = e.pageY - $(this).offset().top - sea_ink.height() / 2;
	                sea_ink.css({
	                    top: y + 'px',
	                    left: x + 'px'
	                }).addClass("sea_animate_ink")
	            })
	        }
	    });
	    $.fn[pluginName] = function(options) {
	        this.each(function() {
	            if (!$.data(this, "plugin_" + pluginName)) {
	                $.data(this, "plugin_" + pluginName, new Plugin(this, options))
	            }
	        });
	        return this
	    }
	})(jQuery, window, document);
});
