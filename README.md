# knockout-spa #

[![Download the latest release](https://img.shields.io/badge/download-zip-brightgreen.svg)](https://github.com/onlyurei/knockout-spa/archive/latest.zip) [![NPM package version](https://img.shields.io/npm/v/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![NPM total downloads](https://img.shields.io/npm/dt/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![Code Climate](https://codeclimate.com/github/onlyurei/knockout-spa/badges/gpa.svg)](https://codeclimate.com/github/onlyurei/knockout-spa) [![Join the chat at https://gitter.im/onlyurei/knockout-spa](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/onlyurei/knockout-spa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[English](https://github.com/onlyurei/knockout-spa/blob/master/README.md) | [中文](https://github.com/onlyurei/knockout-spa/blob/master/README-zh.md)

Take a SPA with Knockout. 

[knockout-spa.mybluemix.net](//knockout-spa.mybluemix.net) (demo/doc site built using this framework itself)

### What's this? ###

A mini but full-fledged SPA framework and boilerplate to build SPAs fast and scalable.

<a href="http://knockoutjs.com/"><img src="http://knockoutjs.com/img/ko-logo.png" height="42" alt="KnockoutJS logo"></a>
<a href="http://requirejs.org/"><img src="http://requirejs.org/i/logo.png" height="42" alt="RequireJS logo">
<a href="https://github.com/flatiron/director"><img src="https://raw.githubusercontent.com/flatiron/director/master/img/director.png" height="42" alt="DirectorJS logo"></a>
<a href="http://jquery.com/"><img src="https://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg" height="42" alt="jQuery logo"></a>
<a href="https://sugarjs.com/"><img src="https://sugarjs.com/assets/images/sugar.svg" height="42" alt="SugarJS logo"></a>

<a href="//knockout-spa.mybluemix.net/files/dependencies"><img src="https://raw.githubusercontent.com/onlyurei/knockout-spa/master/dependencies-graph-framework-page.png" style="max-width: 49%" alt="framework/page dependencies logo"></a>
<a href="//knockout-spa.mybluemix.net/files/dependencies"><img src="https://raw.githubusercontent.com/onlyurei/knockout-spa/master/dependencies-graph-ko.png" style="max-width: 49%" alt="ko dependencies graph"></a>

### Demo ###
* DEV mode: [knockout-spa.mybluemix.net](//knockout-spa.mybluemix.net)
* PROD mode: [knockout-spa-prod.mybluemix.net](//knockout-spa-prod.mybluemix.net)
* Implementaion of the famous [TodoMVC](http://todomvc.com/): https://onlyurei.github.io/todomvc-knockout-spa/
  * Source: https://github.com/onlyurei/todomvc-knockout-spa
* Real World App: [http://rentever.com](http://rentever.com) Social Rental Marketplace - Rent anything from anyone nearby

### Features ###

* Fast and lightweight (Under 100 KB of JS minified and gzipped for initial core setup).
* **Using Knockout 3.4.0+ so ready for [Knockout's flavor of web component and custom tags](http://knockoutjs.com/documentation/component-overview.html).**
  * Component files (html, js, css) are [loaded dynamically on-demand](http://knockoutjs.com/documentation/component-loaders.html): only when the component is in the view. 
* **Provide [Knockout ES5 POJO style viewModel/binding option](https://github.com/nathanboktae/knockout-es5-option4) to help you write cleaner code and make it easier to replace Knockout with other MVVM libraries in the future.**
* Use [2-tier bundle build strategy](https://github.com/requirejs/example-multipage) for production: common module that will be used by most pages, and page-specific modules that will be lazy-loaded. This allows the app to scale to very large - not doing a lump-sum load of giant bundled files for the entire app on first page load - only the needed parts of the page, and common dependencies of all modules will be loaded. As user navigates to other parts of the app, the needed files (js, css, html) are lazy loaded. This is important for the app to be performant especially on mobile devices, since the lump-sum bundle files are not only slower to download due to size, but also slower to parse.
  * Use [`require-css`](https://github.com/guybedford/require-css) and [`require-text`](https://github.com/requirejs/text) AMD plugins to load CSS and HTML templates dynamically ondemand along with the JS modules requiring them; these CSS and HTML template files will be inlined and minified into the corresponding JS modules for production build.
* Use [`require-i18n`](https://github.com/requirejs/i18n) for scalable internationalization/localization.
* **No any watcher/transpiler/build tasks required during development - you debug directly the exact same JS/CSS/HTML/Any file you edit in the IDE. Changes made to a file will be immediately reflected upon refreshing the browser (or use [Chrome devtools workspace](https://developer.chrome.com/devtools/docs/workspaces) or similar tool to have the changes live-rerendered without having to refresh the page).** The only build task required for production is the RequireJS r.js optimizer task that's already predefined in `build.js`. Just figure out a config-based way to serve the assets from `/build` folder for production.
* Routing (based on [Flatiron](https://github.com/flatiron)'s [Director](https://github.com/flatiron/director): HTML5 history (pushState) or hash.
* Highly composable and reusable: pick modules/components for a page in the page-specific JS and they will be auto-wired for the page's HTML template.
* SEO ready ([prerender.io](https://prerender.io/)).
* Organized folder structure to help you stay sane for organizing and reusing modules/files. Not using the file type folder structure such as `/js`, `/css`, `/html`, `/template`, etc, as files belonging to the same module/component are easier to navigate when grouped together under the same folder. If a part of the app should be removed, in theory you just need to delete the corresponding module/component folder, and touch very few other places.
* All documentation are in the major dependencies' own homepages, so that you don't need to completely learn a new framework (**learn and practice general and reusable frontend development skills, not specific giant framework and tooling skills**):
  * [Knockout](http://knockoutjs.com) (MVVM)
  * [Require](http://requirejs.org) (Module Organizer/Loader/Optimizer)
  * [Director](https://github.com/flatiron/director) (Router)
  * [jQuery](http://jquery.com) (DOM Utilities)
  * [Sugar](https://sugarjs.com) (Native Objects Utilities)
* **One important advantage of this mini framework: if you don't like some of the major dependencies, you can swap them out without having to completely rewrite your entire app. Example: use [Vue](https://vuejs.org/) to replace Knockout, use [Webpack](http://webpack.github.io/) to replace Require, use [Crossroads](https://millermedeiros.github.io/crossroads.js/) to replace Director, use [Prototype](http://prototypejs.org/) to replace jQuery, use [Lodash](https://lodash.com/) or [Underscore](http://underscorejs.org/) to replace Sugar, etc. Also, if you don't like certain things of this mini framework, you can easily change them to cater to your own needs/taste.**

### Getting started ###
* Install `node` and `npm` if you haven't.
* [Clone](https://github.com/onlyurei/knockout-spa.git)/[Download](https://github.com/onlyurei/knockout-spa/archive/latest.zip) the repo. You can also run `npm install knockout-spa` to install from [NPM](https://www.npmjs.com/package/knockout-spa), then manually move `knockout-spa` folder out of the `node_modules` folder to where your projects are normally located.
* `cd` into the repo's folder in your OS terminal and run `npm install`. Run `npm start` to run the app in DEV mode, or run `npm run prod` to run the app in PROD mode.
* visit http://localhost:8080 (or the port you specify) to see the app. Notes: 
  * Using history api fallback so `index.html` will be served for all 404s. 
  * You can also change `server.js` so that it can proxy your CORS requests to endpoints which don't have CORS header present.
  * This is the dev-only simple static asset server to allow easier bootstrapping/running/testing of the app. In real life use cases, you can either deploy the frontend to a CDN and enable CORS on your endpoint API server(s) to accept CORS requests from the CDN origin(s), or deploy the frontend along with endpoint API server under the same origin.

### How do I use it? ###
* Take a look at the file structure and comments/`TODO`s in the bootstrapped setup, and use your browser devtool of choice to poke around - you'll figure out everything in 10 minutes or less (assuming you know Knockout and Require fairly well). Use **Show Page Source** toggle on each page to quickly review the `JS`, `HTML`, `CSS` files of the page.
  * **The `Files` page is a great example that demonstrates almost all of the SPA development aspects: routing and url query handling; using `ko` component to encapsulate reusable logic, and using custom tag `file` in the page's template and pass observable params to initialize the component; using `ko` custom binding `highlight` to display the highlighted file source; using the `api-file` api client to make api calls easier, etc.**
  * The `Files Dependencies` page shows the modules dependencies graph of the repo. **You can observe how the 2-tier build structure changes the graph from [DEV mode](//knockout-spa.mybluemix.net/files/dependencies) to [PROD mode](//knockout-spa-prod.mybluemix.net/files/dependencies)**
  * Take a look at the knockout-spa implementation of the famous TodoMVC: https://github.com/onlyurei/todomvc-knockout-spa
* Start building your own SPA from the provided boilerplate - make whatever changes you want to cater to your needs! **Edit the code in your IDE of choice and refresh the page to see the changes. No watcher task is required.** If you have Chrome devtools workspace enabled and mapped to the repo's folder, you get live edit/reload for free out of the box. https://developer.chrome.com/devtools/docs/workspaces
  * If you are new to Knockout, visit http://learn.knockoutjs.com to get the interactive quick start guide. 
* Run `npm run build` in the repo's folder from command line to build assets for production, or run the combo command `npm run prod` to build and start the app in PROD mode. See http://requirejs.org/docs/optimization.html for complete optimization guide.
  * Built assets will be under `/build` folder of the repo. The build is setup as 2 tiers: 1 common module that contains modules that will be required by most page modules, and page modules (1 per page) excluding common dependencies. Each built module will have all the declared dependencies **recursively minified and inlined**. 
  * The [2-tier bundle build strategy](https://github.com/requirejs/example-multipage) allows lazy-loading of page modules as needed, so that the app can be scaled to very large number of pages without upfront load/parse hit for slower browsers if everything is bundle together as 1 single module. When you do a hard refresh, only the common module and the page's module are loaded. When you go to another page using the UI, that new page's module is loaded on-demand, excluding any dependencies already loaded in the common module. Another advantage of this strategy is that no code that references any modules needs to be changed when deployed to production.
  * CSS and HTML template files will be inlined and minified with the corresponding JS modules (assuming you use `css!` and/or `text!` prefixes to add them as the JS module's dependencies) for pure modularization/portability, and reduce HTTP requests to improve app performance.
  * **As you create new pages, remember to add the page modules to the build file `build.js`, and add their common dependencies to the `common` module.**
  * **You should serve the optimized assets for production to avoid numerous AMD require calls and serving unminified files.**

### Workflow of adding a new page ###
* Add the page's route(s) to [`app/shared/routes.js`](https://github.com/onlyurei/knockout-spa/blob/master/app/shared/routes.js).
* Add the page's module folder. Folder's relative path to root should match the newly added route definiton, example: [`app/files`](https://github.com/onlyurei/knockout-spa/tree/master/app/files).
  * JS and HTML files are required, CSS file is optional. If CSS file is added, reference it with the `css!` prefix in the AMD dependencies array in the JS file.
  * JS file exposes the View Model of the page and the lifecyle hooks (callback functions): `init`, `afterRender`, `dispose`, `controllers`, see [`app/home/home.js`](https://github.com/onlyurei/knockout-spa/blob/master/app/home/home.js) for detailed explanation.
  * Page's CSS class will be set on the `<html>` element. It's the dasherized version of the page folder's relative path to app root, without the 'app' part.
  * Prefix all CSS rules with the page's class in the CSS file.
* Add the page's module to [`build.js`](https://github.com/onlyurei/knockout-spa/blob/master/build.js).
* If you need to install new lib dependencies, run `npm install dependency-package-name --save` to install the package and save dependency entry to [`package.json`](https://github.com/onlyurei/knockout-spa/blob/master/package.json), then alias the lib file in [`common.js`](https://github.com/onlyurei/knockout-spa/blob/master/common.js) (so that you don't have to type the long relative path everywhere when using the lib).
* If you are adding third party plugins that manipulates the DOM (e.g. jQuery plugins), avoid using selectors to reference the desired DOM nodes at any cost (spaghetti code). Instead you should add custom bindings and load the plugin ondemand. See [`lib-ext/knockout-custom-bindings-lib.js`](https://github.com/onlyurei/knockout-spa/blob/master/lib-ext/knockout-custom-bindings-lib.js) for examples and detailed instructions.
* If you are creating reusable UI widgets, consider making them components and publish to NPM to be reused across projects. See examples  [`component/file-display/file-display.js`](https://github.com/onlyurei/knockout-spa/blob/master/component/file-display/file-display.js) and [`component/page-source-display/page-source-display.js`](https://github.com/onlyurei/knockout-spa/blob/master/component/page-source-display/page-source-display.js).
  * No component pre-registration is required since a convention is defined in [`lib-ext/knockout-extended.js`](https://github.com/onlyurei/knockout-spa/blob/master/lib-ext/knockout-extended.js#L10). This allows the component modules to be loaded dynamically ondemand only when the custom tags are found in your app's templates, improving performance and app scalability. Modify the convention to your needs if desired.
