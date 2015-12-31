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
    *  '<root-relative url>': '<page module definition>[ page module's corresponding controller]'
    *
    *  notes: 1. slash (/) in url is converted to underscore (_) in page module definition; dash (-) in url is retained as is (-) in page module definition
    *         2. page module's JS file should be defined as a named AMD module with CamelCase as the module alias, e.g: my_page-name -> MyPageName
    *         3. controller is optional but most likely needed unless there are no other internal links (url change but page doesn't) on the page
    *         4. controller name should be the same as the dynamic part of the url and starting with root (/);
    *            in the rare cases where page module definition has different value than the 1 url path component then controller name should match the whole url
    * */
    '/': 'home /',

    //error
    '/error/:code': 'error /:code',

    //path
    '/path/sub-path': 'path_sub-path',
    '/path/sub-path/:token1': 'path_sub-path /:token1',
    '/path/sub-path/:token1/:token2': 'path_sub-path /:token1/:token2'
});
