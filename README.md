#React脚手架

> react+react-router+redux+webpack脚手架 +服务器端渲染


##技术栈

 * react
 * react-router
 * react-redux
 * pm2
 * express
 * webpack
 * babel
 * es6
 
 
##目录结构

 ```
 ├── server 项目服务器端地址 
 ├── template 模板存放目录
 ├── build webapck打开后文件存放位置
 │     ├── development 本地开发目录
 │	    ├── server 压缩后服务器目录
 │     └── production 线上文件
 ├── pm2 pm2启动文件相关配置信息
 │   ├── logs  本地日志目录
 │   ├── pids  启动集群后的线程pid
 │	   ├──pm2_dev.json  启动开发环境下集群
 │    ├──pm2_pro.json  启动生产环境下集群
 ├── src react同构代码目录
 │   ├── assets 资源目录
 │   ├── components react公用组件
 │   ├── constants redux-constants
 │   ├── container  将组件包装一层的容器层
 │   ├── views 后台各个页面
 │   ├── redux redux相关目录
 │   ├── routers react页面路由，同时提供给后端express
 └── uploads 上传图片临时存放目录、空目录
 ```

##启动文件说明

```
   #开发环境启动执行如下：
   npm run dev
   npm run pm2_dev

   #生产环境启动执行如下:
   npm run pro
   npm run pm2_server
  
```

## 参考资料

* [react](https://facebook.github.io/react/)
* [react-router](http://react-guide.github.io/react-router-cn/docs/API.html)
* [redux](http://www.redux.org.cn/)
* [webpack](https://doc.webpack-china.org/)
* [babel](http://babeljs.io/)
* [express](http://www.expressjs.com.cn/)
* [react服务器端渲染](http://cnodejs.org/topic/5660f8f9d0bc14ae27939b37)
* [pm2](http://pm2.keymetrics.io/)
* [es6](http://es6.ruanyifeng.com/)
