Ext.Loader.setConfig({

});


Ext.application({
    authToken: {
        
    },
    views: [
        'portContainer',
        'authContainer',
        'portCarousel',
        'timeSlider',
        'formPanel'
    ],
    name: 'Docket',

    launch: function() {

        Ext.create('Docket.view.authContainer', {fullscreen: true});
    }

});
