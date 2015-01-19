define({
    _name: 'example',
    create: {
        type: 'POST',
        https: true
    },
    findOne: {
        url: '/{id}',
        https: true
    },
    findOneDetailed: {
        url: '/findOneDetailed/{id}',
        https: true
    },
    update: {
        url: '/{id}',
        type: 'PUT',
        https: true
    },
    destroy: {
        url: '/{id}',
        type: 'DELETE'
    }
});
