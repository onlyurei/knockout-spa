# knockout-spa #

Take a SPA with Knockout.

### What is this? ###

A mini (less than 200 LOC but full-fledged) SPA framework built on top of: 
* Knockout (MVVM)
* Require (Module Organizer/Loader/Optimizer)
* Director (Router)
* jQuery (DOM Utilities)
* Sugar (FP/Low Level Utilities).

### How do I use it? ###

* All required files are in the repo already
* Take a look at the file structure and comments/TODOs in the bootstrapped setup - you'll figure out everything in 30 minutes
* Start building your own SPA from the provided setup - be cautious of changing the files in `/js/framework`, `/js/util`, `/js/widget` folders, otherwise do whatever you want with the setup!
* Only needed external thing is the RequireJS optimizer r.js, just run `npm install` in the repo

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
