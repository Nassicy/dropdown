/*
* @Author: Nassicy
* @Date:   2017-05-15 15:13:46
* @Last Modified by:   Nassicy
* @Last Modified time: 2017-05-15 16:54:52
*/

function SelectBox($cell) {
    var $list = $cell.find("ul.venus-menu");
    $list.hide();
    var $items = $list.children("li");
    var $input = $cell.find("input.selectText");
    var isSelectAll = false;
    /* 下拉列表 */
    $input.on("focus", function() {
        $list.show();
    });

    $list.on("click", function(e) {
        e.stopPropagation();
        var tagName = e.target.tagName.toLowerCase();
        if (tagName == "ul")
            return;
        var l = $items.length;
        var p = $(e.target);
        var flag = true;
        switch (tagName) {
        case "li":
            p = p.children("input");
            break;
        case "input":
            flag = !flag;
            break;
        default:
            p = p.siblings("input");
            break;
        }
        if (p.hasClass("selectAll")) {
            if (!isSelectAll) {
                var val = p.next("label").text();
                console.log(true);
                $items.find("input").prop("checked", true);
                $input.val(val);
                $list.hide();
            } else {
                $items.find("input").prop("checked", false);
                console.log(false);
            }
            isSelectAll = !isSelectAll;
        } else {
            var str = "";
            if (p.length) {
                flag && p.prop("checked", !p.prop("checked"));
                if (!p.prop("checked")) {
                    $items.children("input.selectAll").prop("checked", false);
                    isSelectAll = false;
                }
                for (var i = 0; i < l; i++) {
                    if ($items.eq(i).children("input").prop("checked")) {
                        str += $items.eq(i).children("label").text() + ",";
                    }
                }
                str && (str = str.substring(0, str.length - 1));
            } else {
                str = $(e.target).text();
                $list.hide();
            }
            $input.val(str);
        }
    });
    return this;
}
/* 点击空白区域下拉框消失 */
$(document).bind("click",function(e) {
    if ($(e.target).closest("input.selectText").length == 0&& $(e.target).closest("ul.venus-menu").length == 0) {
        $("ul.venus-menu").css("display", "none");
    }
});
$(function(){
     /* 下拉选择 */
    $("div.selectContent").each(function(i, e) {
        var $e = $(e);
        new SelectBox($e);
    });
})