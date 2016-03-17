define({
  _name: 'config',
  /* _crud: true, //(true|[false]) have auto-generated default CRUD methods [optional]
   _https: true, //(true|[false]) must call all methods of this api package via HTTPS [optional] */
  get: {} //api method, if type is GET and url is package name and do not require HTTPS, just put an empty object
  /*,
   * example: {
   *   type: 'POST', //(['GET']|'PUT'|'PATCH'|'POST'|'DELETE') [optional]
   *   https: true, //(true|[false]) must call this api method via HTTPS [optional]
   *   url: '/example?id={id}' //([/apiPrefix/apiPackageName]|/<apiPathnameAfterPrefix>) [optional]
   * }
   *
   * */
});
