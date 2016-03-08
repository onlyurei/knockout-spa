define({
  _name: 'file',
/* _crud: true, //(true|[false]) have auto-generated default CRUD methods [optional]
  https: true, //(true|[false]) must call all methods of this api package via HTTPS [optional] */
  list: {} //api method, if type is GET and url is regular (matching method name) and do not require HTTPS, just put an empty object
  /*,
  * example: {
  *   type: 'POST', //(['GET']|'PUT'|'PATCH'|'POST'|'DELETE') [optional]
  *   https: true, //(true|[false]) must call this api method via HTTPS [optional]
  *   url: '/api/file/example?id={id}' //([/apiPrefix/apiPackageName/apiMethodName]|/<irregularApiMethodUrlOrWithParams>) [optional]
  * }
  *
  * */
});
