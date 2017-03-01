# 网易教育产品部

生产环境：[点击这里](http://garyguo321.github.io/wy_edu_native/dist/)     
开发环境：[点击这里](http://garyguo321.github.io/wy_edu_native/src/)   
    
安装node依赖：
```
npm install
```

启动项目(开发环境)：
```
npm start 或 gulp server:src
```

启动项目(生产环境)：
```
gulp server:dist
```

构建项目：
```
npm build 或 gulp
```

网易教育产品部页面，原生javascript编写，ajax数据交互     
兼容IE9+    
       
用户名：studyOnline 密码：study.163.com    
         
1. 组件化(src/js/component)
    + 生命周期(src/js/lib/lifeCycle.js)
    + 使用html标签属性来进行组件之间的通信(在课程列表和翻页和tab切换之间体现)

2. 模块化(AMD)
    + requirejs
    + 配置入口文件(src/js/config.js)

3. 模版引擎
    + ejs

4. 面向对象
    + 自定义事件（观察者模式）
    + 生命周期
  
5. 工程化
    + bower
    + sass
    + gulp
    + npm script

6. 框架
    + 自己封装的一个类似jquery的框架Jenny.js(src/js/lib/Jenny.js), 兼容ie9+, 功能还在不断完善
    
    
主要功能点:    
     
1. 关闭顶部通知条
    + 点击顶部通知条中的“X 不再提醒”后,刷新页面不再出现此通知条(使用本地 cookie 实现)   
    
2. 登录
    + 点击登录按钮，判断是否存在登录cookie，如果没有则弹出登陆窗口
    
3. 右侧“机构介绍”中的视频介绍    
    + 点击“机构介绍”中的整块图片区域,调用浮层播放介绍视频
    
4. 右侧“热门推荐”
    + 实现每次进入或刷新本页面,“热门推荐”模块中,接口返回20门课程数据,默认展示前10门课程,隔5秒更新一门课程,实现滚动更新热门课程的效果
    
5. 左侧内容区 tab 切换   
    + 点击“产品设计”或“编程语言”tab,实现下方课程内容的更换，点击箭头进入下一页,点击数字进入指定页数
   
6. 轮播图
    + 三张轮播图轮播效果:实现每5s切换图片,图片循环播放;鼠标悬停某张图片, 则暂停切换;切换效果使用入场图片 500ms 淡入的方式。点击后新开窗口打开目的页面
    
7. 响应式
    + 根据浏览器窗口宽度,适应两种视觉布局尺寸。窗口宽度<1205时,使用小屏视觉布局;窗口宽度>=1205 时,使用大屏视觉布局。课程列表的hover有不同效果
