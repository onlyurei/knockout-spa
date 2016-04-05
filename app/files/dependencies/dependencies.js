define(['app/shared/api/api', 'ko', 'sugar', 'css!./dependencies.css'], function (Api, ko) {

  var allDependencies = ko.observable({});

  var Page = ko.observe({
    init: function () {
      Object.isEmpty(allDependencies()) && Api.call('file', 'dependencies', null, null, this._error,
        this._loading).done(allDependencies);
    },
    dispose: function () {
      return false; // return false to prevent public primitive/observable params to be reset when leaving the page
    },
    loading: false,
    error: '',
    selectedNode: ''
  });

  ko.defineComputedProperty(Page, 'graph', function () {
    var edges = [];
    Object.each(allDependencies(), function (key, values) {
      values.each(function (value) {
        edges.push({ data: { source: value, target: key } });
      });
    });

    return {
      nodes: Object.keys(allDependencies()).union(Object.values(allDependencies())).flatten().unique()
        .remove(function (node) {
          return node.startsWith('.');
        }).map(function (node) {
          return { data: { id: node } };
        }),
      edges: edges
    }
  });

  ko.defineComputedProperty(Page, 'nodeGraph', function () {
    var edges = this.graph.edges.findAll(function (edge) {
      return (edge.data.source === this.selectedNode) || (edge.data.target == this.selectedNode);
    }.bind(this));
    var nodes = edges.map(function (edge) { return [edge.data.source, edge.data.target];}).flatten().unique().map(
      function (node) { return { data: { id: node } }; }
    );
    return {
      nodes: (nodes.length && nodes) || [{ data: { id: this.selectedNode } }],
      edges: edges
    };
  });

  return Page;

});
