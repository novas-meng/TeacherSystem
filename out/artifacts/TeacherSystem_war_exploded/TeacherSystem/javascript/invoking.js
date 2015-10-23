/**
 * Created by novas on 15-10-23.
 */
//菜单
$(document).ready(function(){

    (function(){
        var currentMenu = null;
        $("body").on("click","li > a[clicktype=showmenu]",function(e){
            if(currentMenu !== null){
                currentMenu.slideUp();
            }
            var that = $(this);
            var menuItem = currentMenu = $("div[itemtype='menu']",that.parent()).slideDown();

            return false;
        }).on("click","div[itemtype='menu']",function(e){
            if(e.target.nodeName != "A"){
                return false;
            }
        });
        $("body").click(function(){
            if(currentMenu !== null){
                currentMenu.slideUp();
            }
        });
    })();
});
//菜单
//服务项目表格隔行换色
$(document).ready(function(){
    $(".hsptable tr").mouseover(function(){
        $(this).addClass("over");}).mouseout(function(){
        $(this).removeClass("over");
    })
    $(".hsptable tr:even").addClass("alt");
});
//服务流程表格
$(document).ready(function(){
    $(".sclr_inner_table tr").mouseover(function(){
        $(this).addClass("over");}).mouseout(function(){
        $(this).removeClass("over");
    })
    $(".sclr_inner_table tr:even").addClass("alt");
});


// 切换table
$(document).ready(function(){
    var intervalID;
    var curLi;
    $(".stlist a").mouseover(function(){
        curLi=$(this);
        intervalID=setInterval(onMouseOver,250);//鼠标移入的时候有一定的延时才会切换到所在项，防止用户不经意的操作
    });
    function onMouseOver(){
        $(".cur-sub-con").removeClass("cur-sub-con");
        $(".sub-con").eq($(".stlist a").index(curLi)).addClass("cur-sub-con");
        $(".cur").removeClass("cur");
        curLi.addClass("cur");
    }
    $(".stlist a").mouseout(function(){
        clearInterval(intervalID);
    });

    $(".stlist a").click(function(){//鼠标点击也可以切换
        clearInterval(intervalID);
        $(".cur-sub-con").removeClass("cur-sub-con");
        $(".sub-con").eq($(".stlist a").index(curLi)).addClass("cur-sub-con");
        $(".cur").removeClass("cur");
        curLi.addClass("cur");
    });
});

// 招聘信息
$(document).ready(function(){

    $('#aid').bind('click', function(){
        $('#aid_s').show('fast');
        $('#counselor_s').hide('3000');
    });

    $('#counselor').bind('click', function(){
        $('#counselor_s').show('fast');
        $('#aid_s').hide('3000');
    });
});


//弹出隐藏层
function ShowDiv(show_div,bg_div){
    document.getElementById(show_div).style.display='block';
    document.getElementById(bg_div).style.display='block' ;
    var bgdiv = document.getElementById(bg_div);
    bgdiv.style.width = document.body.scrollWidth;
    // bgdiv.style.height = $(document).height();
    $("#"+bg_div).height($(document).height());
};
//关闭弹出层
function CloseDiv(show_div,bg_div)
{
    document.getElementById(show_div).style.display='none';
    document.getElementById(bg_div).style.display='none';
};