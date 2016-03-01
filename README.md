# knockout-spa #

[![Join the chat at https://gitter.im/onlyurei/knockout-spa](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/onlyurei/knockout-spa?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Take a SPA with Knockout.

### What is this? ###

A mini (less than 200 LOC but full-fledged) SPA framework built on top of: 
* Knockout (MVVM)
* Require (Module Organizer/Loader/Optimizer)
* Director (Router)
* jQuery (DOM Utilities)
* Sugar (FP/Low Level Utilities).

### How do I use it? ###
* Install `node` and `npm` if you haven't.
* Run `npm install` in the repo's folder from command line for the first time. 
* If you need to install new lib dependencies, run `npm install dependency-package-name --save` to install the package and save dependency entry to `package.json`, then alias the lib file in `/js/common.js` (so that you don't have to type the long relative path everywhere when using the lib as dependency).
* Run `npm start` in the repo's folder from command line, and visit http://localhost:3000 to see the app. Note: using history api fallback so index.html will be served for all 404s.
* Take a look at the file structure and comments/TODOs in the bootstrapped setup - you'll figure out everything in 10 minutes or less (assuming you know Knockout and Require fairly well).
* Start building your own SPA from the provided setup - be cautious of changing the files in `/js/framework`, `/js/util`, `/js/widget` folders, otherwise do whatever you want with the setup!
* Run `npm run build` in the repo's folder from command line to build assets for production, see http://requirejs.org/docs/optimization.html for complete optimization guide. Built assets will be under `/build` folder of the repo. The build is setup as 2 tiers: common dependency that will be required by most page modules, and page modules excluding common dependencies (all dependencies of the page excluding the common ones will be recursively minified and inlined into the page module). **As you create new pages, remember to add the page module to the build file.** The 2-tier build strategy allows lazy-loading of page modules as needed, so that the app can be scalable to very large number of pages without upfront load/parse hit for slower browsers. **You should serve the optimized assets for production to avoid numerous AMD require calls and serving unminified files.**

### Features ###

* Routing (based on Flatiron's Director): HTML5 history (pushState) or hash.
* Highly composable and reusable: pick modules/components for a page in the page-specific JS and they will be auto-wired for the page's HTML template
* SEO ready (prerender.io)
* Fast and lightweight (85 KB of JS minified and gizpped)
* Two-tier bundle build for JS for production: common module that will be used by most pages, and page-specific modules that will be lazy-loaded
* CSS will be inlined and minified into lib.css and app.css for production, so don't be wary about the `@import` lines in those 2 CSS files - only importing during development
* No any grunt/gulp/watcher tasks required during development - you debug directly the exact same JS/CSS/HTML file you edit in the IDE. Only build task required for production is the RequireJS r.js optimizer task that's already predefined in build.js. Just figure out a config-based way to serve the assets from /build for production
* Organized folder structure to help you stay sane for organizing and reusing JS, CSS, HTML
* Using Knockout 3.3.0+ so ready for Knockout's flavor of web component and custom tags (http://knockoutjs.com/documentation/component-overview.html)
* All documentation are in the major dependencies' own homepages, so that you don't need to completely learn a new framework
  * Knockout http://knockoutjs.com
  * Require http://requirejs.org
  * Director https://github.com/flatiron/director
  * jQuery http://jquery.com
  * Sugar http://sugarjs.com

### Demo ###

Seeing/hacking is believing, here you go.

RentEver - Social Rental Marketplace http://rentever.com
