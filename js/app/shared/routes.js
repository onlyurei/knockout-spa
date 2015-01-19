define({
    /* TODO Add all client side routes.
       If using HTML5 history (real URLs instead of hashes),
       remember to modify the server side 404 responder to return index.html as the response. */
    '/': 'home /',

    //error
    '/error/404': 'error_404',

    //path
    '/path/sub-path': 'path_sub-path',
    '/path/sub-path/:token1': 'path_sub-path /:token1',
    '/path/sub-path/:token1/:token2': 'path_sub-path /:token1/:token2'
});
