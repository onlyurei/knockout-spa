define(['knockout', 'jquery', 'sugar'], function (ko) {

  ko.bindingHandlers.cytoscape = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
      if (!Object.isEmpty(value)) {
        require(['cytoscape'], function (cytoscape) {
          var cy = cytoscape(Object.merge({
            container: element,
            zoomingEnabled: true,
            userZoomingEnabled: false,
            elements: {
              nodes: value.nodes,
              edges: value.edges
            },
            style: cytoscape.stylesheet()
              .selector('node')
              .css({
                'content': 'data(id)',
                'font-size': 12
              })
              .selector('edge')
              .css({
                'target-arrow-shape': 'triangle',
                'target-arrow-color': '#aaa',
                'line-color': '#bbb',
                'width': 1
              })
              .selector('.faded')
              .css({
                'opacity': 0.25,
                'text-opacity': 0
              }),
            layout: {
              name: 'cose',
              directed: true,
              padding: 10
            }
          }, allBindings.cytoscapeOptions, true));

          cy.on('tap', 'node', function (e) {
            var node = e.cyTarget;
            var neighborhood = node.neighborhood().add(node);

            cy.elements().addClass('faded');
            neighborhood.removeClass('faded');
          });

          cy.on('tap', function (e) {
            if (e.cyTarget === cy) {
              cy.elements().removeClass('faded');
            }
          });

          // This will be called when the element is removed by Knockout or
          // if some other part of your code calls ko.removeNode(element)
          // http://knockoutjs.com/documentation/custom-bindings-disposal.html
          ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            cy.destroy(); // memory leak: https://github.com/cytoscape/cytoscape.js/issues/663
          });
        });
      }
    }
  };
  ko.bindingHandlers.cytoscape.update = ko.bindingHandlers.cytoscape.init;

  ko.bindingHandlers.highlight = {
    init: function (element, valueAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor());
      if (value) {
        require(['highlightjs', 'css!highlightjs-css'], function (highlight) { //load lib on-demand to improve performance
          $(element).find('code').each(function (i, block) {
            highlight.highlightBlock(block);
          });
        });
      }
    }
  };
  ko.bindingHandlers.highlight.update = ko.bindingHandlers.highlight.init;

  ko.bindingHandlers.marked = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor()), allBindings = allBindingsAccessor();
      require(['marked'], function (marked) { //load lib on-demand to improve performance
        marked.setOptions(allBindings.markedOptions); //use <bindingName>Options as the options object for various third-party lib bindings
        if (value.url) {
          $.get(value.url).done(function (markdown) {
            $(element).html(marked(markdown));
          });
        } else {
          $(element).html(marked(value));
        }
      });
    }
  };
  ko.bindingHandlers.marked.update = ko.bindingHandlers.marked.init;

  /* TODO: add other third-party lib ko custom bindings (optionally follow lib name alphabetical order)
   * Tip: when to use a ko custom binding, and when to use a ko component?
   *
   * - If the actions are mostly DOM manipulations without the need of a formal data model, such as integrating with
   * jQuery plugins, then it's more convenient, more modular, and lighter-weight to use ko custom bindings. Avoid writing
   * nasty jQuery selectors at any cost - make it a ko custom binding instead, and use the exposed element to replace the
   * selectors.
   * http://knockoutjs.com/documentation/custom-bindings.html
   *
   * - If you are doing more than exposing the element to a DOM manipulation library, consider to use a full fledged ko
   * component instead.
   * http://knockoutjs.com/documentation/component-overview.html
   *
   * You can also use the combination of component and custom binding when appropriate.
   * It's always about writing modular code and separating concerns.
   * See the Files page provided in the boilerplate for reference.
   *
   * NOTE: be defensive of memory leaks on custom bindings! See cytoscape binding above for reference.
   *
   * */

  return ko;

});
