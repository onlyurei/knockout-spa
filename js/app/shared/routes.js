define({
    /* TODO: add all client side routes
     If using HTML5 history (real URLs instead of hashes),
     remember to modify the server side 404 responder to return index.html as the response and change response code to 200. */
    '/': 'home /',

    //error
    '/error/:code': 'error /:code',

    //path
    '/path/sub-path': 'path_sub-path',
    '/path/sub-path/:token1': 'path_sub-path /:token1',
    '/path/sub-path/:token1/:token2': 'path_sub-path /:token1/:token2'
});
