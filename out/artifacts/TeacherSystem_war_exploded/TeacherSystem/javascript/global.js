$(function(){
    (function(){

        var isEmail = function(sText){
            return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(sText);
        }
        $("body").on("click","#headerLoginButton",function(e){
            $.dialog({
                title:"登录",
                lock:{},
                url:"action.php?action=template.login_singup.html",
                onLoad:function(clientElement){
                    var that = this;
                    $("[name=Login_Btn]",clientElement).on("click",function(e){
                        var username = $("[name=Login_Username]",clientElement).val();
                        var password = $("[name=Login_Password]",clientElement).val();
                        if(username.length < 5 || password.length < 5){
                            alert("用户名和密码至少5个数字")
                        }else{
                            $.post("action.php?action=std.login",{
                                Username:username,
                                Password:password
                            },function(result){
                                result = $.parseJSON(result);
                                if(result.code != 0){
                                    alert(result.text);
                                }else{
                                    $("#headerLoginButton").remove();
                                    $("#headerUsercenterButton").html($.cookie("Username"));
                                    that.remove();
                                }
                            });
                        }
                    });
                }
            });
            return false;
        });
        if($.cookie("Username") && $.cookie("Password")){
            $("#headerLoginButton").remove();
            $("#headerUsercenterButton").html($.cookie("Username"));
        }
    })();

    (function(){
        var timer = null;
        $("body").on("mouseenter","a",function(e){
            var element = $(this);
            var elementTitle = element.attr("title");
            if(!elementTitle){
                return;
            }
            var elementLeft   = element.offset().left;
            var elementTop    = element.offset().top;
            var elementWidth  = element.outerWidth();
            var elementHeight = element.outerHeight();
            var titletip = null;
            if(timer !== null){
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function(){
                element.attr("title","");
                titletip = $.titletip({
                    html:elementTitle,
                    path:"top"
                });
                titletip.move(elementLeft + elementWidth / 2 - titletip.element.outerWidth() / 2,elementTop - titletip.element.outerHeight() - titletip.element_path.outerHeight());
            },200);
            var mouseleaveFunction = function(){
                element.attr("title",elementTitle);
                element.off("mouseleave",mouseleaveFunction);
                if(timer !== null){
                    clearTimeout(timer);
                    timer = null;
                }
                if(titletip != null){
                    titletip.remove();
                    titletip = null;
                }
            }
            element.mouseleave(mouseleaveFunction);
        });
    })();

    $("#header").headerbar();
});



// 在线咨询
$(document).ready(function()  {

//隐藏显示窗口
    $(".helper-button").click(function () {
        $(".helper-wrap").toggle("fast",function(){ $(".show").css({right:"67px",top:"112px"});});
    })
//关闭窗口
    $(".helper-box-close").click(function () {
        $(".helper-wrap").hide("fast",function(){ $(".show").css({right:"53px",top:"112px"});});

    })

//广告商网站主显示
    $("#advertiser").mousemove(
        function () {
            $(this).siblings().children("a").removeClass("Ma1");
            $(this).children("a").addClass("Ma1");
            $("#affili").fadeOut(10,function(){$("#adver").fadeIn(10);});
        }
    )


    $("#affiliate").mousemove(
        function () {
            $(this).siblings().children("a").removeClass("Ma1");
            $(this).children("a").addClass("Ma1");
            $("#adver").fadeOut(10,function(){  $("#affili").fadeIn(10);});
        }
    )

    $(".con li a").click(function () {

            $(this).parent().siblings().children(".helper-box-list-con").slideUp(300);
            $(this).parent().children(".helper-box-list-con").slideToggle(300);
        }
    );


    //窗口移动
    $(function(){
        var _move=false;//移动标记
        var _x,_y;//鼠标离控件左上角的相对位置
        var moveNode=$('.helper-wrap');
        var mouseDownNode=$('.helper-wrap');
        var windowWidth=$(window).width();
        var windowHeight=$(window).height();
        var moveNodeHeight=$('.helper-wrap').height();
        var moveNodeWidth=$('.helper-wrap').width();

        mouseDownNode.mousedown(function(e){
            e.preventDefault();
            windowWidth=$(window).width();
            windowHeight=$(window).height();
            moveNodeHeight=$('.helper-wrap').height();
            moveNodeWidth=$('.helper-wrap').width();
            _move=true;
            _x=e.pageX-(windowWidth-parseInt(moveNode.css("right"))-moveNodeWidth);
            _y=e.pageY-parseInt(moveNode.css("top"));

        });
        $(document).mousemove(function(e){
            if(_move){
                var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
                var y=e.pageY-_y;
                if(x < 0) x=0;//判断div与浏览器距离
                if(x > windowWidth-moveNodeWidth) x=windowWidth-moveNodeWidth;
                if(y < 0) y=0;
                if(y > windowHeight-moveNodeHeight) y=windowHeight-moveNodeHeight;
                moveNode.css({top:y,right:(windowWidth-x-moveNodeWidth)});
                //控件新位置
                e.preventDefault();
            }
        }).mouseup(function(){
            _move=false;

        });
    });
})

// 在线咨询结束


/**
 * Created by novas on 15-10-23.
 */
