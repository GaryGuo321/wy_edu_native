!function(e,t){"function"==typeof define?define.amd&&define("pagination",["jenny","emitter","lifeCycle","ejs"],e):t.Pagination=e(Jenny)}(function(e,t,i){function a(){i.apply(this,arguments),t.apply(this,arguments),this.totalPages=null,this.visiblePages=null,this.currentPage=null,this.pre=null,this.next=null}return e.extend(a.prototype,t.prototype,i.prototype,{templateUI:function(){var t={visiblePages:this.visiblePages,totalPages:this.totalPages,currentPage:this.currentPage};this.container[0].innerHTML="",this.template=e(ejs.render('<div class="arrow-right arrows" id="arrow-right">            <p>&gt;</p>        </div>        <ul id="pageList">        \t<% for(var i = 0; i < (visiblePages > totalPages? totalPages : visiblePages); i++) { %>        \t<li value="<%= i+1 %>" <% if(currentPage == i+1) { %>class="select-li"<% } %>><%= i+1 %></li>        \t<% } %>        </ul>        <div class="arrow-left arrows" id="arrow-left">            <p>&lt;</p>        </div>',t),!0)},eventUI:function(){var t=this;this.on("getData",this.onPageChange),this.on("pageSwitch",function(t){var i=this.container.find("#pageList").childs().removeClass("select-li"),a=e.matchVal(i,"value",t);i.eq(a).addClass("select-li")}),this.on("pageShow",function(){var e=this.currentPage,i=this.totalPages,a=this.visiblePages,n=Math.round(this.visiblePages/2),r=null,s=null,l=!1,o=this.container.find("#pageList").childs();if(i>a){if(l=!0,e>n&&e<=i-n){r=n,s=e;for(var c=e;c>e-n;c--)o.eq(r-1).attr("value",c),o[r-1].innerHTML=c,r--;for(var u=n+1;u<=a;u++)o.eq(u-1).attr("value",++s),o[u-1].innerHTML=s}if(e<=n&&l){falg=!1;for(var c=0;c<a;c++)o.eq(c).attr("value",c+1),o[c].innerHTML=c+1}if(e>i-n&&l){l=!0;for(var u=0,c=i-a;c<i;c++)o.eq(u).attr("value",c+1),o[u++].innerHTML=c+1}}t.fire("pageSwitch",e),this.onPageChange&&t.fire("getData")}),this.container.find("#arrow-right").addHandler("click",function(e){e.preventDefault(),t.currentPage<t.totalPages&&(t.currentPage+=1,t.container.attr("value",t.currentPage),t.fire("pageShow"))}),this.container.find("#arrow-left").addHandler("click",function(e){e.preventDefault(),t.currentPage>1&&(t.currentPage-=1,t.container.attr("value",t.currentPage),t.fire("pageShow"))}),this.container.find("#pageList").childs().addHandler("click",function(i){i.preventDefault(),t.currentPage!=e(this).attr("value")&&(t.currentPage=Number(e(this).attr("value")),t.container.attr("value",t.currentPage),t.fire("pageShow"))})},styleUI:function(){this.container.attr("value",this.currentPage)},init:function(t){return e.extend(this,t),this.render(this.container),this}}),a},window);