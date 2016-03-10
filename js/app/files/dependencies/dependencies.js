define([
  'app/shared/api/api', 'ko', 'sugar', 'css!../../../../css/app/files/dependencies/dependencies.css'
], function (Api, ko) {

  var allDependencies = ko.observable({});

  var Dependencies = {
    init: function () {
      Api.call('file', 'dependencies', null, null, Dependencies.error, Dependencies.loading).done(allDependencies);
    },
    loading: ko.observable(false),
    error: ko.observable('')
  };

  Dependencies.graph = ko.computed(function () {
    var edges = [];
    Object.each(allDependencies(), function (key, values) {
      values.each(function (value) {
        edges.push({ data: { source: value, target: key } });
      });
    });

    return {
      nodes: Object.keys(allDependencies()).union(Object.values(allDependencies())).flatten().unique().map(function (node) {
        return { data: { id: node } };
      }),
      edges: edges
    }
  });

  return Dependencies;

});
