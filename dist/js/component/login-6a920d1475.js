!function(t,i){"function"==typeof define?define.amd&&define("login",["jenny","emitter","lifeCycle","ejs"],t):i.Login=t(Jenny)}(function(t,i,e){function n(){e.apply(this,arguments),i.apply(this,arguments),this.form=null}return t.extend(n.prototype,i.prototype,e.prototype,{templateUI:function(){var i={};this.template=t(ejs.render('<div class="g-modal login-modal">\t\t    <div class="g-align"></div>\t\t    <div class="g-wrap">\t\t        <div class="g-header">\t\t\t\t\t<div class="g-close">\t\t        \t\t<a href="javascript:void(0)" class="close icon-cross"></a>\t\t    \t\t</div>\t\t        </div>\t\t        <div class="g-main">\t\t        \t<div class="login-content">\t\t\t\t\t\t<h1>登录网易云课堂</h1>\t\t\t\t\t\t<form class="login-form" name="login-form">\t\t\t\t\t\t\t<div class="user-message">\t\t\t\t\t\t\t\t<input type="text" class="user-name" id="user" name="userName">\t\t\t\t            \t<span class="remind-user" id="remind-user">帐号</span>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="pwd-message">\t\t\t\t\t\t\t\t<input type="password" class="user-password" id="pwd" name="password">\t\t\t\t            \t<span class="remind-pwd" id="remind-pwd">密码</span>\t\t\t\t\t\t\t</div>\t\t\t\t            <button class="submit" type="submit" id="submit">登录</button>\t\t\t\t        </form>\t\t        \t</div>\t\t        \t<div class="login-error">            \t\t\t<i class="icon-cross"></i>            \t\t\t<p>用户名或密码错误！</p>        \t\t\t</div>\t\t        </div>\t\t    </div>\t\t</div>',i),!0)},resetUI:function(){for(var t=this.form.elements,i=0;i<t.length;i++)t[i].value="",t[0].focus(),this.fire("monitor",t[i])},errorUI:function(){var i=t(".login-error");i.show(),i.animate({"margin-top":-60,opacity:1},150);setTimeout(function(){i.animate({"margin-top":-20,opacity:0},150,function(){i.hide()})},1500);this.resetUI()},eventUI:function(){this.form=document.forms["login-form"],console.log(this.form.elements);var i=this;this.on("monitor",function(i){i.value?t(i).siblings().hide():t(i).siblings().show()}),t(".login-modal .user-name").addHandler("input",function(){i.fire("monitor",this)}),t(".login-modal .user-password").addHandler("input",function(){i.fire("monitor",this)}),t(".login-modal .close").addHandler("click",function(i){i.preventDefault(),t(".login-modal").hide()}),t(".login-modal .submit").addHandler("click",function(e){e.preventDefault(),t.CORSRequest("http://study.163.com/webDev/login.htm",{userName:t.md5(this.form.userName.value),password:t.md5(this.form.password.value)},function(e){1==e?(t(".login-modal").hide(),t.setCookie("isLogin",!0,1e4),window.location.reload()):i.errorUI()})})},init:function(i){return t.extend(this,i),this.render(this.container),this}}),n},window);