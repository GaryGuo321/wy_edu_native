function TopNotice(e,t,o){this.cookieName=e,this.cookieValue=cookieUtil.get(e),this.notice=t,this.close=o}function topNoticeSet(){var e=dom.getId("h-notice"),t=dom.getId("no-remind"),o=new TopNotice("wangyi_notice_show",e,t);o.cookieValue?dom.hide(o.notice):dom.show(o.notice),eventUnit.addHandler(o.close,"click",function(e){var t=eventUnit.getEvent(e);eventUnit.preventDafault(t),o.hideNotice(1e4)})}function Follow(e,t){this.cookieName=e,this.cookieValue=cookieUtil.get(e),this.parentBox=t}function Login(e,t,o,i){this.cookieName=e,this.cookieValue=cookieUtil.get(e),this.loginFrame=o,this.back=i;for(var n in t)this[n]=t[n]}function loginFollow(){var e=dom.getId("message"),t=new Follow("followSuc",e),o=dom.getId("login-frame"),i=dom.getId("fixed-back"),n=new Login("loginSuc",{user:dom.getId("user"),userRemind:dom.getId("remind-user"),pwd:dom.getId("pwd"),pwdRemind:dom.getId("remind-pwd")},o,i);n.cookieValue&&t.cookieValue?t.creAlreadyFollowEle():t.creFollowEle(),eventUnit.addHandler(e,"click",function(e){var o=eventUnit.getEvent(e);eventUnit.preventDafault(o);var i=eventUnit.getTarget(o),a=i.className;if("cancel"==a){var s=dom.getClass(document,"follow-now")[0];t.creCancelFollow(s)}"follow"==a&&(n.cookieValue=cookieUtil.get(n.cookieName),n.cookieValue?t.creFollow(i):n.showFrame())});var a=dom.getId("login-close");eventUnit.addHandler(a,"click",function(e){var t=eventUnit.getEvent(e);eventUnit.preventDafault(t),n.closeFrame()});var s=dom.getId("submit");eventUnit.addHandler(s,"click",function(e){var o=document.forms["login-form"],i=eventUnit.getEvent(e);eventUnit.preventDafault(i),CORSRequest("http://study.163.com/webDev/login.htm",{userName:md5(o.userName.value),password:md5(o.password.value)},function(e){if(e=parseInt(e)){var o=dom.getClass(document,"follow")[0];n.closeFrame(),dom.removeElement(o),cookieUtil.set(n.cookieName,!0),cookieUtil.set(t.cookieName,!0),t.creAlreadyFollowEle()}else{var i=dom.getClass(document,"login-error")[0];n.errorInfer(i)}})})}function Banner(e,t,o){this.img=e,this.imgLength=this.img.length,this.navSpan=dom.childNodes(t),this.navSpanLength=this.navSpan.length,this.navSpanStyle=o}function bannerImg(){var e=dom.getClass(document,"banner"),t=dom.getId("arrow"),o=new Banner(e,t,"spanClick");o.defaultShow(1);var i=setInterval(o.timer.bind(o),5e3),n=dom.getClass(document,"m-banner");eventUnit.addHandler(n[0],"mouseenter",function(){clearInterval(i)}),eventUnit.addHandler(n[0],"mouseleave",function(){i=setInterval(o.timer.bind(o),5e3)});for(var a=0;a<o.navSpanLength;a++)~function(e){eventUnit.addHandler(o.navSpan[e],"click",function(t){eventUnit.getEvent(t);o.switchImg(e),o.switchNavSpan(this,e)})}(a)}function MessageScoll(e,t,o){this.box=e,this.mes1=t,this.mes2=o}function hotCouresScroll(){var e=dom.getId("list-box"),t=dom.getId("mes1"),o=dom.getId("mes2"),i=new MessageScoll(e,t,o);CORSRequest("http://study.163.com/webDev/hotcouresByCategory.htm",null,i.getMessage.bind(i)),i.intervalScoll(66,300,5e3,!0)}function SubList(e,t,o){this.tabParent=e,this.allTab=dom.childNodes(this.tabParent),this.listParent=t,this.pageList=o,this.defaultShowNum="",this.defaultShowPage="",this.showPage="",this.tabNum="",this.totalPage="",this.data=""}function subjectList(){var e=dom.getId("tab-list"),t=dom.getId("subject-list"),o=dom.getId("pageList"),i=new SubList(e,t,o),n="";document.body.clientWidth>1205?(i.defaultShow(20,1,1),n=1):(i.defaultShow(15,1,1),n=2),CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.defaultShowPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i)),eventUnit.addHandler(i.tabParent,"click",function(e){var t=eventUnit.getEvent(e),o=eventUnit.getTarget(t);i.tabNum=dom.getAttr(o,"value"),CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.defaultShowPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i)),i.switchSub(o,"tab-click")});var a=dom.getId("arrow-left"),s=dom.getId("arrow-right");eventUnit.addHandler(a,"click",function(e){i.showPage>1&&(i.showPage-=1,CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.showPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i)))}),eventUnit.addHandler(s,"click",function(e){i.showPage<i.totalPage&&(i.showPage+=1,CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.showPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i)))}),eventUnit.addHandler(i.pageList,"click",function(e){var t=eventUnit.getEvent(e),o=eventUnit.getTarget(t);i.showPage=dom.getAttr(o,"value"),CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.showPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i))}),document.all&&!document.addEventListener?console.log("IE8 or lower"):window.onresize=function(){document.body.clientWidth>1205?1!=n&&(n=1,i.defaultShowNum=20,CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.showPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i))):2!=n&&(n=2,i.defaultShowNum=15,CORSRequest("http://study.163.com/webDev/couresByCategory.htm",{pageNo:i.showPage,psize:i.defaultShowNum,type:10*i.tabNum},i.composeEle.bind(i)))}}function VedioPaly(e,t,o){this.back=e,this.frame=t,this.vedio=o,this.status=1}function vedioControl(){var e=dom.getId("fixed-back"),t=dom.getId("vedio-frame"),o=dom.getId("myVideo"),i=new VedioPaly(e,t,o),n=dom.getId("play-content");eventUnit.addHandler(n,"click",i.showVedio.bind(i));var a=dom.getId("vedio-close");eventUnit.addHandler(a,"click",i.closeVedio.bind(i)),eventUnit.addHandler(i.vedio,"click",function(e){i.status?i.vedio.play():i.vedio.pause()}),eventUnit.addHandler(i.vedio,"pause",function(e){i.status=1}),eventUnit.addHandler(i.vedio,"play",function(e){i.status=0})}TopNotice.prototype.hideNotice=function(e){cookieUtil.set(this.cookieName,!0,e),dom.hide(this.notice)},Follow.prototype.creFollowEle=function(){var e=dom.insertElement(this.parentBox,"p","first",{"class":"follow"});dom.insertText(e,"+关注")},Follow.prototype.creAlreadyFollowEle=function(){var e=dom.insertElement(this.parentBox,"p","first",{"class":"follow-now"}),t=(dom.insertElement(e,"i","last",{"class":"true-img"}),dom.insertText(e,"已关注 "),dom.insertElement(e,"span","last")),o=(dom.insertText(t,"|"),dom.insertText(e," "),dom.insertElement(e,"a","last",{"class":"cancel",href:"javascript:void(0)"}));dom.insertText(o,"取消")},Follow.prototype.creFollow=function(e){dom.removeElement(e),cookieUtil.set(this.cookieName,!0),this.creAlreadyFollowEle()},Follow.prototype.creCancelFollow=function(e){cookieUtil.unset(this.cookieName),dom.removeElement(e),this.creFollowEle()},Login.prototype.showFrame=function(){formUtil.monitor(this.user,this.userRemind),formUtil.monitor(this.pwd,this.pwdRemind),formUtil.resetForm(this.user,this.userRemind),formUtil.resetForm(this.pwd,this.pwdRemind),dom.show(this.back),dom.show(this.loginFrame)},Login.prototype.closeFrame=function(){dom.hide(this.back),dom.hide(this.loginFrame)},Login.prototype.errorInfer=function(e){e.style.display="block",dom.myAnimate(e,{"margin-top":-60,opacity:1},150,!0);setTimeout(function(){dom.myAnimate(e,{"margin-top":-20,opacity:0},150,!0,function(){e.style.display="none"})},1e3)},Banner.prototype.switchImg=function(e){this.img[e].style.zIndex=100,dom.myAnimate(this.img[e],{opacity:1},600);for(var t=dom.sameSibling(this.img,this.img[e]),o=0;o<t.length;o++)dom.myAnimate(t[o],{opacity:0},600),t[o].style.zIndex=50},Banner.prototype.switchNavSpan=function(e,t){dom.addClass(e,this.navSpanStyle);for(var o=dom.sameSibling(this.navSpan,this.navSpan[t]),i=0;i<o.length;i++)dom.removeClass(o[i],this.navSpanStyle)},Banner.prototype.defaultShow=function(e){var e=e-1;this.img[e].style.zIndex=100,this.img[e].style.opacity=1,this.navSpanStyle&&dom.addClass(this.navSpan[e],this.navSpanStyle)},Banner.prototype.timer=function(){for(var e=0;e<this.navSpanLength;e++){var t=this.navSpan[e].className;if(t==this.navSpanStyle){var o=e+1;o==this.navSpanLength&&(o=0);break}}this.switchImg(o),this.switchNavSpan(this.navSpan[o],o)},MessageScoll.prototype.getMessage=function(e){var t=JSON.parse(e);console.log(t),this.mes1.innerHTML="",this.createEle(this.mes1,t),this.mes2.innerHTML=this.mes1.innerHTML},MessageScoll.prototype.createEle=function(e,t){for(var o=t.length,i=0;i<o;i++){var n=dom.insertElement(e,"li","last"),a=dom.insertElement(n,"a","last",{"class":"rank-list",href:"javascript:void(0)",title:t[i].name,"data-id":t[i].id,"data-name":t[i].name,"data-provider":t[i].provider,"data-learnerCount":t[i].learnerCount,"data-price":t[i].price,"data-categoryName":t[i].categoryName,"data-description":t[i].description}),s=dom.insertElement(a,"div","last"),l=(dom.insertElement(s,"img","last",{src:t[i].middlePhotoUrl}),dom.insertElement(a,"h2","last")),r=(dom.insertText(l,t[i].name),dom.insertElement(a,"p","last"));dom.insertElement(r,"i","last",{"class":"icon-user"}),dom.insertText(r," "+t[i].learnerCount)}},MessageScoll.prototype.intervalScoll=function(e,t,o,i){var n=this,a=null,s=null,l=t/e,r=function(){n.box.scrollTop++,n.box.scrollTop%e==0?(clearInterval(a),s=setTimeout(d,o)):n.box.scrollTop>=n.mes1.offsetHeight&&(n.box.scrollTop=0)},d=function(){a=setInterval(r,l)};s=setTimeout(d,o),i&&(eventUnit.addHandler(this.box,"mouseenter",function(){clearInterval(a),clearTimeout(s)}),eventUnit.addHandler(this.box,"mouseleave",function(){s=setTimeout(d,o)}))},SubList.prototype.defaultShow=function(e,t,o){this.defaultShowNum=e,this.defaultShowPage=t,this.showPage=t,this.tabNum=o;var i=this.tabNum-1;dom.addClass(this.allTab[i],"tab-click")},SubList.prototype.switchSub=function(e,t){this.showPage=this.defaultShowPage,dom.addClass(e,t);for(var o=dom.allSibling(e,this.tabParent),i=0;i<o.length;i++)dom.removeClass(o[i],t)},SubList.prototype.composeEle=function(e){var e=JSON.parse(e),t=e.list,o=t.length;this.listParent.innerHTML="",this.totalPage=e.totalPage;var i=this.totalPage,n=e.pagination.pageIndex,a=8;switch(this.pageList.innerHTML="",!0){case n<=5:for(var s=0;s<a;s++){var l=dom.insertElement(this.pageList,"li","last",{value:s+1});dom.insertText(l,s+1)}break;case n>i-4:for(var s=a;s>0;s--){var l=dom.insertElement(this.pageList,"li","last",{value:i-s+1});dom.insertText(l,i-s+1)}break;default:for(var r=n-4,s=0;s<a;s++){console.log(r);var l=dom.insertElement(this.pageList,"li","last",{value:r});dom.insertText(l,r++)}}for(var d=dom.getClass(document,"arrows"),m=0;m<d.length;m++)d[m].style.display="block";for(var c=dom.getTagName(this.pageList,"li"),h=c.length,m=0;m<h;m++)if(dom.getAttr(c[m],"value")==n){dom.addClass(c[m],"select-li");break}for(var u=0;u<o;u++){0==t[u].price?t[u].price="免费":t[u].price="¥"+Number.prototype.toFixed.call(t[u].price,2),t[u].categoryName||(t[u].categoryName="无");var p=dom.insertElement(this.listParent,"div","last",{"class":"subject-box"}),g=dom.insertElement(p,"a","last",{"class":"subject",href:"javascript:void(0)",title:t[u].name,"data-id":t[u].id,"data-name":t[u].name,"data-provider":t[u].provider,"data-learnerCount":t[u].learnerCount,"data-price":t[u].price,"data-categoryName":t[u].categoryName,"data-description":t[u].description}),v=(dom.insertElement(g,"img","last",{src:t[u].middlePhotoUrl,"class":"sub-img"}),dom.insertElement(g,"p","last",{title:t[u].name,"class":"title"})),f=(dom.insertText(v,t[u].name),dom.insertElement(g,"p","last",{"class":"album"})),w=(dom.insertText(f,t[u].provider),dom.insertElement(g,"p","last",{"class":"num"})),y=(dom.insertElement(w,"i","last",{"class":"icon-user"}),dom.insertText(w," "+t[u].learnerCount),dom.insertElement(g,"p","last",{"class":"price"})),b=(dom.insertText(y,t[u].price),dom.insertElement(p,"a","last",{"class":"sub-hover"})),S=(dom.insertElement(b,"img","last",{src:t[u].middlePhotoUrl}),dom.insertElement(b,"h3","last")),N=(dom.insertText(S,t[u].name),dom.insertElement(b,"p","last",{"class":"num"})),E=(dom.insertElement(N,"i","last",{"class":"icon-user"}),dom.insertText(N," "+t[u].learnerCount+"人在学"),dom.insertElement(b,"p","last",{"class":"provider"})),k=(dom.insertText(E,"发布者："+t[u].provider),dom.insertElement(b,"p","last",{"class":"sort"})),U=(dom.insertText(k,"分类："+t[u].categoryName),dom.insertElement(b,"p","last",{"class":"description"}));dom.insertText(U,t[u].description)}},VedioPaly.prototype.showVedio=function(){console.log(this),this.vedio.load(),dom.show(this.back),dom.show(this.frame)},VedioPaly.prototype.closeVedio=function(){return this.vedio.pause(),dom.hide(this.back),dom.hide(this.frame),!1},window.onload=function(){topNoticeSet(),loginFollow(),bannerImg(),hotCouresScroll(),subjectList(),vedioControl()};