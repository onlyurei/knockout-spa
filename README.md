# knockout-spa #

[![Download the latest release](https://img.shields.io/badge/download-zip-brightgreen.svg)](https://github.com/onlyurei/knockout-spa/archive/latest.zip) [![NPM package version](https://img.shields.io/npm/v/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![NPM total downloads](https://img.shields.io/npm/dt/knockout-spa.svg)](https://www.npmjs.com/package/knockout-spa) [![Join the chat at https://gitter.im/onlyurei/knockout-spa](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/onlyurei/knockout-spa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[English](/README.rd) | [中文](/README-zh.md)

Take a SPA with Knockout. 
http://knockout-spa.mybluemix.net

### What's this? ###

A mini but full-fledged SPA framework and boilerplate to build SPAs fast and scalable.

### Features ###

* Routing (based on Flatiron's Director): HTML5 history (pushState) or hash.
* Highly composable and reusable: pick modules/components for a page in the page-specific JS and they will be auto-wired for the page's HTML template.
* SEO ready (prerender.io).
* Fast and lightweight (Under 100 KB of JS minified and gzipped for initial setup).
* Two-tier bundle build for production: common module that will be used by most pages, and page-specific modules that will be lazy-loaded.
* Use [`require-css`](https://github.com/guybedford/require-css) and [`require-text`](https://github.com/requirejs/text) AMD plugins to load CSS and HTML templates dynamically ondemand along with the JS modules requiring them; these CSS and HTML template files will be inlined and minified into the corresponding JS modules for production build.
* No any grunt/gulp/watcher/build tasks required during development - you debug directly the exact same JS/CSS/HTML file you edit in the IDE. Only build task required for production is the RequireJS r.js optimizer task that's already predefined in `build.js`. Just figure out a config-based way to serve the assets from `/build` folder for production.
* Organized folder structure to help you stay sane for organizing and reusing JS, CSS, HTML.
* Using Knockout 3.3.0+ so ready for [Knockout's flavor of web component and custom tags](http://knockoutjs.com/documentation/component-overview.html).
* All documentation are in the major dependencies' own homepages, so that you don't need to completely learn a new framework (learn and practice general and reusable frontend development skills, not specific giant framework and tooling skills):
  * Knockout (MVVM) http://knockoutjs.com
  * Require (Module Organizer/Loader/Optimizer) http://requirejs.org
  * Director (Router) https://github.com/flatiron/director
  * jQuery (DOM Utilities) http://jquery.com
  * Sugar (Native Objects Utilities) http://sugarjs.com

### Demo ###
* DEV mode: http://knockout-spa.mybluemix.net
* PROD mode: http://knockout-spa-prod.mybluemix.net

### How do I use it? ###
* Install `node` and `npm` if you haven't.
* [Clone](https://github.com/onlyurei/knockout-spa.git)/[Download](https://github.com/onlyurei/knockout-spa/archive/latest.zip) the repo. You can also run `npm install knockout-spa` to install from [NPM](https://www.npmjs.com/package/knockout-spa), then manually move `knockout-spa` folder out of the `node_modules` folder to where your projects are normally located.
* `cd` into the repo's folder in your OS terminal. Run `npm run dev` to run the app in DEV mode, or run `npm run prod` to run the app in PROD mode.
* visit http://localhost:8080 (or the port you specify) to see the app. Notes: 
  * Using history api fallback so `index.html` will be served for all 404s. 
  * You can also change `server.js` so that it can proxy your CORS requests to endpoints which don't have CORS header present.
  * This is the dev-only simple static asset server to allow easier bootstrapping/running/testing of the app. In real life use cases, you can either deploy the frontend to a CDN and enable CORS on your endpoint API server(s) to accept CORS requests from the CDN origin(s), or deploy the frontend along with endpoint API server under the same origin.
* Take a look at the file structure and comments/TODOs in the bootstrapped setup, and use your browser devtool of choice to poke around - you'll figure out everything in 10 minutes or less (assuming you know Knockout and Require fairly well).
  * **The `Files` page is a great example that demonstrates almost all of the SPA development aspects: routing and url query handling; using `ko` component to encapsulate reusable logic, and using custom tag `file` in the page's template and pass observable params to initialize the component; using `ko` custom binding `highlight` to display the highlighted file source; using the `api-file` api client to make api calls easier, etc.**
  * The `Files Dependencies` page shows the modules dependencies graph of the repo. **You can observe how the 2-tier build structure changes the graph from [DEV mode](http://knockout-spa.mybluemix.net/files/dependencies) to [PROD mode](http://knockout-spa-prod.mybluemix.net/files/dependencies)**
* Start building your own SPA from the provided boilerplate. Be cautious of changing the files in `/js/framework`, `/js/util`, `/js/widget` folders, otherwise do whatever you want with the boilerplate! **Edit the code in your IDE of choice and refresh the page to see the changes. No watcher task is required.** If you have Chrome devtools workspace enabled and mapped to the repo's folder, you get live edit/reload for free out of the box. https://developer.chrome.com/devtools/docs/workspaces
  * If you are new to Knockout, visit http://learn.knockoutjs.com to get the interactive quick start guide. 
* If you need to install new lib dependencies, run `npm install dependency-package-name --save` to install the package and save dependency entry to `package.json`, then alias the lib file in `/js/common.js` (so that you don't have to type the long relative path everywhere when using the lib).
* Run `npm run build` in the repo's folder from command line to build assets for production, see http://requirejs.org/docs/optimization.html for complete optimization guide. Or run the combo command `npm run prod` to build and start the app in PROD mode.
  * Built assets will be under `/build` folder of the repo. The build is setup as 2 tiers: 1 common module that contains modules that will be required by most page modules, and page modules (1 per page) excluding common dependencies. Each built module will have all the declared dependencies **recursively minified and inlined**. 
  * The 2-tier build strategy allows lazy-loading of page modules as needed, so that the app can be scaled to very large number of pages without upfront load/parse hit for slower browsers if everything is bundle together as 1 single module. When you do a hard refresh, only the common module and the page's module are loaded. When you go to another page using the UI, that new page's module is loaded on-demand, excluding any dependencies already loaded in the common module.
  * CSS and HTML template files will be inlined and minified with the corresponding JS modules (assuming you use `css!` and/or `text!` prefixes to add them as the JS module's dependencies) for pure modularization/portability, and reduce HTTP requests to improve app performance.
  * **As you create new pages, remember to add the page modules to the build file `build.js`, and add their common dependencies to the `common` module.**
  * **You should serve the optimized assets for production to avoid numerous AMD require calls and serving unminified files.**
