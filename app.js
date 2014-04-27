Ext.application({
    authToken: {
        
    },
    views: [
        'authContainer',
        'portCarousel',
        'portContainer',
        'formPanel',
        'timeSlider'
    ],
    name: 'Docket',

    launch: function() {
        Ext.create('Docket.view.authContainer', {fullscreen: true});
    }

});
