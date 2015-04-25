# knockout-spa #

Take a SPA with Knockout.

### What is this? ###

* A mini (but full-fledged) SPA framework built on top of Knockout, Require, Director, jQuery, Sugar.
* 1.0.0

### How do I use it? ###

* All required files are in the repo already
* Take a look at the file structure and comments/TODOs in the bootstrapped setup - you'll figure out everything in 30 minutes
* Only needed external thing is the RequireJS optimizer r.js, just run npm install in the repo

### Features ###

* Routing (based on Flatiron's Director): HTML5 history (pushState) or hash.
* Highly composable and reusable: pick modules/components for a page in the page-specific JS and they will be auto-wired for the page's HTML template
* SEO ready (prerender.io)
* Fast and lightweight (85 KB of JS minified and gizpped)
* Two-tier bundle build for JS for production: common module that will be used by most pages, and page-specific modules that will be lazy-loaded
* Organized folder structure to help you stay sane for organizing and reusing JS, CSS, HTML
* Using Knockout 3.3.0+ so ready for Knockout's flavor of web component and custom tags (http://knockoutjs.com/documentation/component-overview.html)
* All documentation are in the major dependencies' own homepages, so that you don't need to completely learn a new framework
  * Knockout http://knockoutjs.com
  * Require http://requirejs.org
  * Director https://github.com/flatiron/director
  * jQuery http://jquery.com
  * Sugar http://sugarjs.com
