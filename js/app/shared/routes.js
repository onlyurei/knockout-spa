define({
  /* TODO: add all client side routes
   If using HTML5 history (real URLs instead of hashes),
   remember to modify the server side 404 responder to return index.html as the response and change response code to 200. */
  /* *
   *  Notes on routes definitions:
   *
   *  order by dictionary
   *  group by top-level dictionary (1st url path component)
   *
   *  mapping:
   *  '<root-relative url>': '<page module path>[ page module's corresponding controller name]'
   *
   *  notes: 1. controller is optional but most likely needed unless there are no other internal links (url change but page doesn't) on the page
   *         2. controller name should be the same as the dynamic part of the url and starting with root (/);
   *            in the rare cases where page module definition has different value than the 1 url path component then controller name should match the whole url
   * */
  '/': 'app/home/home',

  //error
  '/error/:code': 'app/error/error /:code',

  //files
  '/files': 'app/files/files /',
  '/files/dependencies': 'app/files/dependencies/dependencies'
});
