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
        'MyFormPanel'
    ],
    name: 'Confluent',

    launch: function() {

        Ext.create('Confluent.view.authContainer', {fullscreen: true});
    }

});
