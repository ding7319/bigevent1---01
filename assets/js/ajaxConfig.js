// ajax的配置==> 优化根路径 ==> $.ajaxPrefilter()
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // 处理headers请求头，带上token
  options.headers = {
    Authorization: localStorage.getItem("token"),
  };
});