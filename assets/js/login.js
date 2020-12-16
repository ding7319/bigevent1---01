$(function () {
    $(".gotore").click(function () {
        $(".loginup").hide();
        $(".register").show();
    });
    $(".gotolo").click(function () {
        $(".loginup").show();
        $(".register").hide();
    });


let form = layui.form;
let layer = layui.layer;
form.verify({
  pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repass: function (value, item) {
   if (value !== $(".passIpt").val()) {
        return "两次输入的密码不一致";
        }
         }
});  

// 实现注册功能
// 1.当form表单提交的时候，触发表单的submit提交功能==> 注册form的submit事件
// 2.阻止form表单的默认行为
// 3.收集表单中数据 ==> jq的serialize() form中带有name属性的值
// 4.发送ajax==> 接口文档

// 1.提交注册部分，触发提交功能
$("#regiForm").on("submit", function (e) {
    // 2.阻止默认行为
   e.preventDefault();

// 3.搜集表单数据
let data = $(this).serialize();
// 4.发送ajax
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data,
    success: function (res) {
        console.log(res);
      // 注册失败
      if (res.status !== 0) {
        return layer.msg(res.message);     
      }
      // 注册成功
      layer.msg("注册成功");
      // 清空注册的表单数据
      $("#regiForm")[0].reset();
      // 去登录
      $(".gotoup").click();
    },
  });
})
//登录功能
  1.  //提交登录页面
  $("#loginForm").on("submit", function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        // 把token储存在本地存储中
        // 前一个是名称，后一个是数据的令牌，找位置
        localStorage.setItem("token",res.token)
        // 登陆成功，页面跳转，延时1秒钟
        layer.msg("登陆成功，即将跳转",
          { time: 1000, },
          function () {
            location.href = "/home/index.html";
          }
        );
      }
    })
  })
});