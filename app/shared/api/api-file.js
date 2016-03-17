define({
  _name: 'file',
  /* _crud: true, //(true|[false]) have auto-generated default CRUD methods [optional]
   _https: true, //(true|[false]) must call all methods of this api package via HTTPS [optional] */
  list: {}, //api method, if type is GET and url is package name and do not require HTTPS, just put an empty object
  dependencies: {
    url: '/dependencies'
  }
  /*,
   * example: {
   *   type: 'POST', //(['GET']|'PUT'|'PATCH'|'POST'|'DELETE') [optional]
   *   https: true, //(true|[false]) must call this api method via HTTPS [optional]
   *   url: '/example?id={id}' //([/apiPrefix/apiPackageName]|/<apiPathnameAfterPrefix>) [optional]
   * }
   *
   * */
});
