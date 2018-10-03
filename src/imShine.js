var isShine = false;
var imIsShineT;

window.onfocus = function () {
    isShine = false;

    clearInterval(imIsShineT);

    document.title = "心理测试后台管理系统";
};


window.onblur = function () {
    isShine = true;
    imIsShineT = '';
};


function imShineIndexFn() {
    var title = document.title;
    if (/新/.test(title) == false) {
        document.title = '【你有新消息】';
    } else {
        document.title = '【　　　　　】';
    }
}

