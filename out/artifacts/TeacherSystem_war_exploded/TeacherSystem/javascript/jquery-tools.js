/**
 * Created by novas on 15-10-23.
 */


(function($){
    /*
     * locker
     * options{
     *   background: lock color,rgb,rgba,hex string
     *   opaticy: opacity,number
     *   speed: lock speed,number
     * }
     *
     * methods{
     *   resize: reset width and height
     *   show: show
     *   hide: hide
     *   remove: remove locker element
     * }
     */
    $.locker = function(opts){
        var options = $.extend({
            background:"#565656",
            opacity:0.5,
            speed:300,
            zIndex:99
        },opts);

        var element_locker = $("<div></div>").css({
            opacity:0,
            left:0,
            top:0,
            zIndex:options.zIndex,
            position:"fixed",
            background:options.background
        });

        var exports = {
            dom:element_locker,
            resize:function(){
                element_locker.css({
                    width:$(document).width(),
                    height:$(document).height()
                });
                return exports;
            },
            show:function(){
                element_locker.show().animate({
                    opacity:options.opacity
                },options.speed);
                return exports;
            },
            hide:function(){
                element_locker.animate({
                    opacity:0
                },options.speed,function(){
                    element_locker.hide();
                });
                return exports;
            },
            remove:function(){
                element_locker.animate({
                    opacity:0
                },options.speed,function(){
                    element_locker.remove();
                });
                $(window).off("resize",exports.resize);
                return exports;
            }
        }
        $("body").append(element_locker);
        $(window).resize(exports.resize);

        return exports.show().resize();
    }
    /*
     *  dialog
     *  options{
     *   width: dialog outer width
     *   height: dialog outer height
     *   lock: locker options,default is null
     *   title: dialog title
     *   speed: opacity animate speed,show or hide or remove
     *  }
     *
     *  methods{
     *   center: center
     *   title: get or set dialog title text
     *   show: show dialog
     *   hide: hide dialog
     *   remove: remove dialog
     *   html: dialog html content
     *   width: get or set dialog outer width
     *   height: get or set dialog outer height
     *  }
     */
    $.dialog = function(opts){
        var options = $.extend({
            width:600,
            height:480,
            lock:null,
            title:"dialog",
            speed:200,
            closeAction:"remove",
            html:"",
            url:""
        },opts);

        var element_main = $("<div class='jt_dialog'></div>");
        var element_body = $("<div class='_dialogBody'></div>");
        var element_body_title = $("<div class='_title'></div>");
        var element_body_title_text = $("<div class='_text'></div>");
        var element_body_title_buttons = $("<div class='_buttons'></div>");
        var element_body_title_buttons_close = $("<div class='_button _close'></div>");
        var element_body_client = $("<div class='_client'></div>");

        element_body_title_buttons.append(element_body_title_buttons_close).on("mouseenter mouseleave mousedown mouseup","div._button",function(e){
            var that = $(this);
            switch(e.type){
                case "mouseenter":
                    that.addClass("hover");
                    break;
                case "mouseleave":
                    that.removeClass("hover");
                    break;
                case "mousedown":
                    that.addClass("press");
                    break;
                case "mouseup":
                    that.removeClass("press");
                    break;
            }
        });
        element_body_title.append([element_body_title_text,element_body_title_buttons]);
        element_body.append([element_body_title,element_body_client]);
        element_main.append(element_body);


        var locker = null;
        if($.isPlainObject(options.lock)){
            locker = $.locker(options.lock);
        }
        var exports = {
            center:function(){
                element_main.css({
                    top:($(window).outerHeight() - options.height) / 2 + "px",
                    left:($(window).outerWidth() - options.width) / 2 + "px"
                });
                return exports;
            },
            title:function(s){
                if(s != undefined){
                    element_body_title_text.html(options.title = s);
                    return exports;
                }
                return options.title;
            },
            show:function(){
                if(locker != null){
                    locker.show();
                }
                element_main.css("opacity",0.2).show().animate({
                    opacity:1
                },options.speed);
                return exports;
            },
            hide:function(){
                if(locker != null){
                    locker.hide();
                }
                element_main.animate({
                    opacity:0.2
                },options.speed,function(){
                    element_main.hide();
                });
                return exports;
            },
            remove:function(){
                if(locker != null){
                    locker.remove();
                }
                element_main.animate({
                    opacity:0
                },options.speed,function(){
                    element_main.remove();
                });
                return exports;
            },
            html:function(s){
                if(s == undefined){
                    return element_body_client.html();
                }
                element_body_client.html(s);
                return exports;
            },
            width:function(n){
                if(n == undefined){
                    return options.width;
                }
                element_main.outerWidth(options.width = n);
                return exports;
            },
            height:function(n){
                if(n == undefined){
                    return options.height;
                }
                element_main.outerHeight(options.height = n);
                return exports;
            }
        }
        $("body").append(element_main);
        element_body_title_buttons_close.click(function(){
            if(options.closeAction == "hide"){
                exports.hide();
            }else if(options.closeAction == "remove"){
                exports.remove();
            }
        });
        if(options.html != ""){
            exports.html(options.html);
            if(options.onLoad){
                options.onLoad.call(exports,element_body_client);
            }
        }else if(options.url != ""){
            $.get(options.url,function(result){
                exports.html(result);
                if(options.onLoad){
                    options.onLoad.call(exports,element_body_client);
                }
            });
        }
        exports.show().width(options.width).height(options.height);
        exports.title(options.title);

        return exports.center();
    }
    /*
     * headerbar
     * options{
     *  zIndex
     * }
     */
    $.fn.headerbar = function(opts){
        var options = $.extend({
            zIndex:99
        },opts);

        var element = $(this).data("options",options);
        var elementWidth = element.width();
        var elementHeight = element.height();
        var elementOuterHeight = element.outerHeight();
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var visible = true;
        var spacing = $("<div></div>");
        var windowWidth = $(window).width();
        var elementWidth_window = windowWidth - elementWidth;

        $(window).on("scroll",function(e){
            var currentScollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if(currentScollTop > scrollTop){
                if(visible == true && currentScollTop > elementHeight * 3){
                    element.stop().animate({
                        top:-elementOuterHeight + "px"
                    },400);
                    visible = false;
                }
            }else if(currentScollTop < scrollTop){
                if(visible == false){
                    element.stop().animate({
                        top:0
                    });
                    visible = true;
                }
            }
            scrollTop = currentScollTop;
        }).resize(function(){
            element.width($(window).width() + elementWidth_window);
        });
        element.css({
            position:"fixed",
            zIndex:options.zIndex,
            top:0,
            width:windowWidth + elementWidth_window
        });
        spacing.css({
            height:elementOuterHeight,
            width:windowWidth + elementWidth_window
        });
        spacing.insertBefore(element);

        return element;
    }
    /*
     * title tip
     * options{
     *  zIndex
     *  html
     *  path: top right bottom left
     * }
     *
     * methods{
     * show
     * hide
     * remove
     * html
     * move
     * }
     *
     * example: $.titletip({html:"123123"});
     */
    $.titletip = function(opts){
        var options = $.extend({
            zIndex:999,
            html:"titletip",
            path:"top"
        },opts);

        var element_path = $("<div class='jt_titletip_path " + options.path + "'></div>").css("zIndex",options.zIndex + 1);
        var element = $("<div class='jt_titletip'></div>").css("zIndex",options.zIndex);

        var elementWidth = 0;
        var elementHeight = 0;
        var elementWidth_path = 0;
        var elementHeight_path = 0;
        var exports = {
            element:element,
            element_path:element_path,
            show:function(){
                element.show().animate({
                    opacity:1
                },50);
                element_path.show().animate({
                    opacity:1
                },50);
                return this;
            },
            hide:function(callback){
                var that = this;
                var n = 0;
                element.animate({
                    opacity:0
                },50,function(){
                    element.hide();
                    if(++n == 2){
                        callback.call(that);
                    }
                });
                element_path.animate({
                    opacity:0
                },50,function(){
                    element_path.hide();
                    if(++n == 2){
                        callback.call(that);
                    }
                });
                return this;
            },
            remove:function(){
                this.hide(function(){
                    element.remove();
                    element_path.remove();
                });
                return this;
            },
            html:function(s){
                if(s == undefined){
                    return element.html();
                }
                element.html(s);
                elementWidth = element.outerWidth();
                elementHeight = element.outerHeight();

                return this;
            },
            move:function(x,y){
                var elementLeftPos = x;
                var elementTopPos = y;
                var elementLeftPos_path = x;
                var elementTopPos_path = y;
                switch(options.path){
                    case "top":
                        elementTopPos_path += elementHeight - 1;
                        elementLeftPos_path += elementWidth /2 - elementWidth_path / 2;
                        break;
                    case "right":
                        elementLeftPos += elementWidth_path - 1;
                        elementTopPos_path += elementHeight / 2 - elementHeight_path / 2;
                        break;
                    case "bottom":
                        elementTopPos += elementHeight_path - 1;
                        elementLeftPos_path += elementWidth /2 - elementWidth_path / 2;
                        break;
                    case "left":
                        elementLeftPos_path += elementWidth - 1;
                        elementTopPos_path += elementHeight / 2 - elementHeight_path / 2;
                        break;
                }
                element.css({
                    left:elementLeftPos + "px",
                    top:elementTopPos + "px"
                });
                element_path.css({
                    left:elementLeftPos_path + "px",
                    top:elementTopPos_path + "px"
                });
                return this;
            }
        }
        $("body").append([element_path,element]);
        exports.html(options.html);

        elementWidth_path  = element_path.outerWidth();
        elementHeight_path = element_path.outerHeight();

        return exports;
    }

    $.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

})(jQuery);