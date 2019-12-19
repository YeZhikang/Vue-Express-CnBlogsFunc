# 仿写 CnBlogs  

> 一个集 博客、想法、问答、招聘、新闻、小组、邮件发收、收藏夹、快速检索 等模块，带有 用户个人界面、可视化展现、中后台系统 的集成论坛工程。

## 评委请看这里
- 👉 组别：G13 
- 👉 技术栈 (前后端分离) ：
  - 前端：Vue + Vue-CLI + Vue-Router / HTML5 + CSS3 + JavaScript (ES6)
  - 后端：Express (Node.js) + MongoDB
- 👉 代码展示
  - 后端代码：
    - 1.总路径 📂 /server 
      - 1.1 论坛核心模块 📂 /server/app.js 
      - 1.2 论坛业务层模块 📂 /server/user.js 
      - 1.3 论坛博客模块 📂 /server/blog.js 
  - 前端代码：
    - 1.总路径 📂 /src 
      - 1.1 博客组件集 📂 /src/components/Blog/ 
      - 1.2 杂类（招聘、收藏夹、快速检索、小组等功能）组件集 📂 /src/components/Flash_Group_Directory/
      - 1.3 首页、行为、Echarts 展示组件集 📂 /src/components/Index/
      - 1.4 登录组件集 📂 /src/components/Login/
      - 1.5 用户个人界面组件集 📂 /src/components/userInfo/
      - 1.6 中后台管理系统 📂 /src/components/AdminController.vue

## 功能介绍
虽然命题叫做 "仿写CnBlogs" ，但在项目实际实施过程中，我发现 CnBlogs 的界面有很多不人性化的地方，比如导航栏混乱、功能繁琐等，在进行不断的演化后，尽管做出了很像 CnBlogs 的首页等相关页面，但我想将最后的仿写定义在功能上实现 CnBlogs 的大部分功能，但在 UI、Web 页面上修改得更加简洁和美观。

## 项目展示
   部分功能展示（图）
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
