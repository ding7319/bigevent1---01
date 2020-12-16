getUserInfo();
let layer = layui.layer;
function getUserInfo(){
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            // 默认头像和首字母头像选择
            if (res.status !== 0) {
                return layer.msg("获取信息失败");
            };
// 名字二选一
            let name = res.data.nickname || res.data.username;

            // 展示名字
            $("#welcome").text("欢迎" + name);
            // 二选一
            if (res.data.user_pic) {
                $(".layui-nav-img").attr("src", res.data.user_pic).show();
                $(".cirle").hide();
            } else {
                $(".layui-nav-img").hide();
                $(".cirle").show().text(name[0].toUpperCase());
            };
        },
        complete: function (res) {
            let data = res.responseJSON;
            console.log(data);
            if (data.status == 1 && data.message == "身份认证失败！") {
                localStorage.removeItem("token"); 
                location.href = "/home/login.html";              
            }
        },
        });
};
$("#logoBtn").click(function () {
    layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem("token");
        location.href = "/home/login.html";
        layer.close(index);
    })
})