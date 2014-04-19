Ext.Loader.setConfig({

});


Ext.application({
    authToken: {
        
    },
    views: [
        'portContainer',
        'landContainer',
        'authContainer',
        'portCarousel',
        'landCarousel',
        'timeSlider',
        'formPanel'
    ],
    name: 'Docket',

    launch: function() {

        Ext.create('Docket.view.authContainer', {fullscreen: true});
    }

});
