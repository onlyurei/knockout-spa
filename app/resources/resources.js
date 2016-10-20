define(['ko', 'css!./resources.css'], function (ko) {
  return ko.observe({
    resource: '',
    controllers: {
      '/': function () { this.resource = ''; },
      '/:resource': function (resource) { this.resource = resource; }
    }
  });
});
