define([
  'app/shared/api/api', 'ko', 'sugar', 'css!../../../../css/app/files/dependencies/dependencies.css'
], function (Api, ko) {

  var file = ko.observable('');
  var allDependencies = ko.observable({});

  var Dependencies = {
    init: function () {
      Api.call('file', 'dependencies', null, null, Dependencies.error, Dependencies.loading).done(allDependencies);
    },
    controllers: {
      '/': function () {
        file(Object.fromQueryString(window.location.search).file || '');
      }
    },
    loading: ko.observable(false),
    error: ko.observable('')
  };

  Dependencies.graph = ko.computed(function () {
    var edges = [];
    var dependencies = file().compact() ? Object.select(allDependencies(), file()) : allDependencies();

    Object.each(dependencies, function (key, values) {
      values.each(function (value) {
        edges.push({ data: { source: value, target: key } });
      });
    });

    return {
      nodes: Object.keys(dependencies).union(Object.values(dependencies)).flatten().unique().map(function (node) {
        return { data: { id: node } };
      }),
      edges: edges
    }
  });

  return Dependencies;

});
