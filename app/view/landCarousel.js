Ext.define('Confluent.view.landCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.landCarousel',

    requires: [
        'Confluent.view.myContainer'
    ],

    config: {
        fullscreen: true,
        itemId: 'landCarousel',
        ui: 'light',
        direction: 'vertical',
        showAnimation: {
            type: 'fadeIn',
            duration: 750
        }
    }

});