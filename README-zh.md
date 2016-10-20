# knockout-spa #

[![下载最新版](https://img.shields.io/badge/下载-zip-brightgreen.svg)](https://github.com/onlyurei/knockout-spa/archive/latest.zip) [![NPM包版本](https://img.shields.io/npm/v/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![NPM总共下载数](https://img.shields.io/npm/dt/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![Code Climate](https://codeclimate.com/github/onlyurei/knockout-spa/badges/gpa.svg)](https://codeclimate.com/github/onlyurei/knockout-spa) [![在Gitter上参与讨论 https://gitter.im/onlyurei/knockout-spa](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/onlyurei/knockout-spa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[English](https://github.com/onlyurei/knockout-spa/blob/master/README.md) | [中文](https://github.com/onlyurei/knockout-spa/blob/master/README-zh.md)

用Knockout做个SPA吧。

[knockout-spa.mybluemix.net](//knockout-spa.mybluemix.net) (用本框架做的演示/文档站)

### 这是什么? ###

迷你但五脏俱全的单页程序 (SPA) 框架和脚手架，用于快速创建SPA并且保证能够优雅地扩展成巨型应用。

<a href="http://knockoutjs.com/"><img src="http://knockoutjs.com/img/ko-logo.png" height="42" alt="KnockoutJS logo"></a>
<a href="http://requirejs.org/"><img src="http://requirejs.org/i/logo.png" height="42" alt="RequireJS logo">
<a href="https://github.com/flatiron/director"><img src="https://raw.githubusercontent.com/flatiron/director/master/img/director.png" height="42" alt="DirectorJS logo"></a>
<a href="http://jquery.com/"><img src="https://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg" height="42" alt="jQuery logo"></a>
<a href="http://sugarjs.com/"><img src="http://sugarjs.com/assets/images/sugar.svg" height="42" alt="SugarJS logo"></a>

<a href="//knockout-spa.mybluemix.net/files/dependencies"><img src="https://raw.githubusercontent.com/onlyurei/knockout-spa/master/dependencies-graph-ko.png" style="max-width: 49%" alt="ko dependencies graph"></a>
<a href="//knockout-spa.mybluemix.net/files/dependencies"><img src="https://raw.githubusercontent.com/onlyurei/knockout-spa/master/dependencies-graph-framework-page.png" style="max-width: 49%" alt="framework/page dependencies logo"></a>

### 演示 ###
* 开发模式：[knockout-spa.mybluemix.net](//knockout-spa.mybluemix.net)
* 生产模式：[knockout-spa-prod.mybluemix.net](//knockout-spa-prod.mybluemix.net)
* 实现著名的[TodoMVC](http://todomvc.com/): https://onlyurei.github.io/todomvc-knockout-spa/
    * 源码: https://github.com/onlyurei/todomvc-knockout-spa
* 真实世界应用： [http://rentever.com](http://rentever.com) 社交租赁平台－从周围的人租任何东西

### 功能特色 ###

* 路由 (基于[Flatiron](https://github.com/flatiron)的[Director](https://github.com/flatiron/director))：HTML5历史API (pushState) 或者hash。
* 高度可组合及可重用：挑选在一个页面会用到的模块/组件并把他们加到该页面对应的JS里，它们会自动被连接到该页面的模板上。
* 搜索引擎优化 (SEO) 就绪：[prerender.io](https://prerender.io/)。
* 快速及轻量 (优化和gzip后初始核心依赖项总共少于100 KB下载量)。
* 用[2层的构建策略](https://github.com/requirejs/example-multipage)打包创建生产环境资源：大部分页面都依赖的公用模块，及按需加载的各页面自有的模块。
* 用 [`require-css`](https://github.com/guybedford/require-css) 及 [`require-text`](https://github.com/requirejs/text) AMD插件来动态按需加载各JS模块所依赖的CSS和HTML模板。这些CSS和HTML模板在生产环境资源创建时会被自动优化及打包进依赖它们的JS模块里.
* **在开发时无需任何监视/转译/构建任务 - 你可以直接在浏览器里debug你在IDE里编辑的对应文件，文件更改保存后刷新浏览器就能看到改变（或者使用[Chrome开发者工具工作空间](https://developer.chrome.com/devtools/docs/workspaces)或类似工具来自动重渲染改变，无须刷新页面）。**唯一需要的构建任务是用RequireJS r.js来优化构建生产环境资源。该任务已经在 `build.js` 定义好。你只需确保把保存在 `/build` 文件夹里的构建好的生产环境资源用于生产环境。
* 整齐的目录结构帮助你清楚地归类和重用模块和文件。
* 用 [`require-i18n`](https://github.com/requirejs/i18n) 来做可扩展的国际化/本地化。
* **采用 Knockout 3.4.0+，所以可以用[Knockout风味的组件和自建标签](http://knockoutjs.com/documentation/component-overview.html)。**
* **提供 [Knockout ES5 POJO风格的viewModel/binding](https://github.com/nathanboktae/knockout-es5-option4)，帮助写出更干净的代码以及保留用别的MVVM框架代替Knockout的可能。**
* 所有帮助文档都在主要依赖库自己的主页里，所以你无需完全从头学习一个新框架 (**学习及练习通用及可重用的前端开发技术，而不是特定的巨型框架和工具技术**):
  * [Knockout](http://knockoutjs.com) (MVVM库)
  * [Require](http://requirejs.org) (模块组织器/加载器/优化器)
  * [Director](https://github.com/flatiron/director) (路由器)
  * [jQuery](http://jquery.com) (DOM工具集)
  * [Sugar](http://sugarjs.com) (原生对象工具集)
* **本迷你框架的重要优势：如果你不喜欢这些主要依赖库，你可以把它们换掉而不用完全重写整个项目。例如: 用[Vue](https://vuejs.org/)来换掉Knockout，用[Webpack](http://webpack.github.io/)来换掉Require，用[Crossroads](https://millermedeiros.github.io/crossroads.js/)来换掉Director，用[Prototype](http://prototypejs.org/)来换掉jQuery，用[Lodash](https://lodash.com/)或者[Underscore](http://underscorejs.org/)来换掉Sugar，等等。另外，如果你不喜欢此框架的一些内容，你可以容易地改变它们。**

### 快速开始指南 ###
* 安装 `node` 和 `npm`，如果还没有的话。
* [克隆](https://github.com/onlyurei/knockout-spa.git)/[下载](https://github.com/onlyurei/knockout-spa/archive/latest.zip) 本项目。你也可以运行 `npm install knockout-spa` 来从 [NPM](https://www.npmjs.com/package/knockout-spa) 安装，然后手动把 `knockout-spa` 文件夹移出 `node_modules` 文件夹，放到你通常放项目文件夹的地方。
* 在你操作系统的终端上 `cd` 到你保存本项目的文件夹并运行 `npm install`。运行 `npm start` 来运行开发模式，或者运行 `npm run prod` 来运行生产模式。
* 访问 http://localhost:8080 (或者你制定的端口) 来看运行的app。注意：
  * 采用历史API适配所以 `index.html` 会被用于所有404请求。
  * 你也可以修改 `server.js` 用来做跨域资源请求 (CORS) 代理.
  * 这只是个仅用于开发环境的简单资源服务器。用于帮助更容易地运行和测试所开发的app。在现实生活中，你可以把前端完全部署到CDN上，然后开启后台API服务器的CORS设定以接受来自该CDN域名的跨域资源请求。或者你可以把前端和后端API部署到同一个域。

### 怎么用？ ###
* 看一下初始的文件结构和注释以及 `TODO`，然后用你的浏览器开发工具来把玩一下 - 你应该能在10分钟内搞明白项目的大致原理 (假定你对 Knockout 及 AMD/Require 有较好了解)。 用**显示本页源码**工具来快速查看每页的 `JS`, `HTML`, `CSS` 文件。 
  * **`文件` 页面是一个演示几乎所有SPA开发所应考虑到问题的好例子：路由以及URL搜索字符串处理; 用 `ko` 组件来封装可重用逻辑，及在页面的HTML模板里用自定义标签 `file` 来传递可观察参数并且初始化组件实例; 用 `ko` 自定义绑定来显示格式化后的源文件内容; 用 `api-file` api 客户端来简化 api 请求等。**
  * `文件依赖关系` 页面显示项目文件模块的依赖图。**你可以观察2层的构建设置是如何从 [开发模式](//knockout-spa.mybluemix.net/files/dependencies) 模式到 [生产模式](//knockout-spa-prod.mybluemix.net/files/dependencies) 模式改变此图的。**
  * 参考用knockout-spa实现的著名的TodoMVC: https://github.com/onlyurei/todomvc-knockout-spa
* 用提供的脚手架开始搭建你自己的SPA。看哪里不爽就改哪里！**用你喜欢的IDE修改文件，刷新浏览器即可看到所做的改变，无需任何监视任务.** 如果启用了Chrome开发者工具里的工作空间 (workspace) 并且映射到项目本地文件夹，你可以免费得到实时编辑/重渲染。https://developer.chrome.com/devtools/docs/workspaces
  * 如果你是第一次用Knockout，你可以访问 http://learn.knockoutjs.com 来进行快速交互式学习。
* 在项目文件夹运行 `npm run build` 来为生产环境构建优化的资源，或者运行 `npm run prod` 来构建及以生产环境方式运行 app。详细完整的优化配置请参考 http://requirejs.org/docs/optimization.html 。
  * 构建好的资源会被放在项目的 `/build` 文件夹里。构建被配置成2层：一个包含大部分页面所依赖的模块的共用模块，以及各页面自己的模块 (一个页面对应一个模块)。每个构建好的模块将包含该模块所声明的全部依赖模块 (以及它们递归依赖的所有模块)。
  * 这种[2层的构建策略](https://github.com/requirejs/example-multipage)让我们能按需加载各页面模块，这样的话 app 能扩展成很大规模但不会在访问时一下子就下载全部页面的全部模块。当你做页面强制刷新的时候，只有共用模块和该页面模块会被下载和解析。当你放问另一个页面时，只会额外加载那个页面的模块。另外，此策略无需在部署生产模式时改变引用模块的任何代码。
  * CSS和HTML模板会被优化及合并到依赖它们的对应的JS模块里 (如果你用 `css!` 和 `text!` AMD前缀来声明它们作为该JS模块的依赖项) 从而保证纯正的模块性和可移植性，并且减少HTTP请求提高性能。
  * **当你创建新页面时，记得把该页面模块加到 `build.js` 构建配置文件里，并且把页面的共用依赖模块加到 `common` 模块里。**
  * **在生产环境，你应当使用优化构建好的资源，避免大量的 AMD 请求以及使用未优化的文件。**

### 加新页面的流程 ###
* 加该页面的路由到 [`app/shared/routes.js`](https://github.com/onlyurei/knockout-spa/blob/master/app/shared/routes.js)。
* 加该页面的模块文件夹。文件夹到根目录的相对路径应带跟新加的路由定义匹配，例子：[`app/files`](https://github.com/onlyurei/knockout-spa/tree/master/app/files)。
  * JS和HTML文件是必须的，CSS文件可选。如果加了CSS文件，在JS文件的AMD依赖项里加`css!`前缀来引用它。
  * JS文件暴露该页面的视图模型（View Model）以及生命周期钩子： `init`，`afterRender`，`dispose`，`controllers`，参照 [`app/home/home.js`](https://github.com/onlyurei/knockout-spa/blob/master/app/home/home.js)来看具体定义。
  * 页面的CSS类名将会被加到 `<html>` 元素上。它就是该页面文件相对于根目录的路径（用破折号代替斜杠），除去“app”部分。
  * 用该页面的CSS类名来作为CSS文件里所有规则的前缀。
* 将该页面的模块加到[`build.js`](https://github.com/onlyurei/knockout-spa/blob/master/build.js)里。
* 如需加入新的库， 运行`npm install dependency-package-name --save`来安装以及加入库依赖声明到[`package.json`](https://github.com/onlyurei/knockout-spa/blob/master/package.json)，然后加入库名和路径到[`common.js`](https://github.com/onlyurei/knockout-spa/blob/master/common.js)里（这样在各处引用该库时就不用打很长的相对路径）。
* 如果加入第三方操纵DOM节点的库（比如jQuery插件），千万不要用选择器来引用要操纵的DOM节点。将该库加到自定义绑定里，参见[`lib-ext/knockout-custom-bindings-lib.js`](https://github.com/onlyurei/knockout-spa/blob/master/lib-ext/knockout-custom-bindings-lib.js)来看具体例子和指南。
* 如果创建可重用的UI部件，考虑把它们做成组件并发布到NPM以便将来能在不同项目重用。参考例子[`component/file-display/file-display.js`](https://github.com/onlyurei/knockout-spa/blob/master/component/file-display/file-display.js)和[`component/page-source-display/page-source-display.js`](https://github.com/onlyurei/knockout-spa/blob/master/component/page-source-display/page-source-display.js)。
  * 因为在[`lib-ext/knockout-extended.js`](https://github.com/onlyurei/knockout-spa/blob/master/lib-ext/knockout-extended.js#L10)定义了组件默认协定，无须预注册组件。这让组件的模块能够动态按需加载，提高性能和可扩展性。如果需要可修改该默认协定。
