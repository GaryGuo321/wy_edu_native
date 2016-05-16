用户名：studyOnline 密码：study.163.com<br>
<br>
使用bower下载需要的包，如requirejs等<br>
使用sass／compass对css进行编写<br>
使用requirejs模块化加载js文件<br>
使用gulp做为构建工具<br>
<br>
遵循css书写规范<br>
<br>
1.位置属性(position, top, right, z-index, display, float等)<br>
2.大小(width, height, padding, margin)<br>
3.文字系列(font, line-height color text-align等)<br>
4.背景(background, border等)<br>
5.其他(animation, transition等)<br>
<br>

使用原生js进行js代码的编写，使用自己写的一个小小的函数库(myLibrary)，封装了一些方法等<br>
便于代码编写<br>

使用面向对象，代码结构比较好维护<br>
<br>

主要功能点：<br>
<br>
1. 关闭顶部通知条<br>
点击顶部通知条中的“X 不再提醒”后,刷新页面不再出现此通知条(使用本地 cookie 实现)<br>
<br>
2. 关注“网易教育产品部”/登录<br>
点击关注按钮:首先判断登录的 cookie 是否已设置(loginSuc)<br>
如果未设置登录 cookie,则弹出登录框,使用给定的用户名和密码调用服务器 Ajax 登录<br>
成功后设置登录 cookie登录成功后,调用关注 API,并设置关注成功的 cookie(followSuc)<br>
登录后“关注”按钮变成不可点的“已关注”状态<br>
<br>
3. 右侧“机构介绍”中的视频介绍<br>
点击“机构介绍”中的整块图片区域,调用浮层播放介绍视频<br>
<br>
4. 右侧“热门推荐”<br>
实现每次进入或刷新本页面,“热门推荐”模块中,接口返回20门课程数据,默认展示前10门课程,隔5秒更新一门课程,实现滚动更新热门课程的效果<br>
<br>
5. 左侧内容区 tab 切换<br>
点击“产品设计”或“编程语言”tab,实现下方课程内容的更换. 点击箭头进入下一页,点击数字进入指定页数<br>
<br>
6. 轮播图<br>
三张轮播图轮播效果:实现每5s切换图片,图片循环播放;鼠标悬停某张图片, 则暂停切换;切换效果使用入场图片 500ms 淡入的方式。点击后新开窗口打开目的页面<br>