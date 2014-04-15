Ext.define('Confluent.view.mainCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.mainCarousel',

    requires: [
        'Confluent.view.myContainer'
    ],

    config: {
        fullscreen: true,
        itemId: 'mainCarousel',
        ui: 'light',
        direction: 'vertical',
        showAnimation: {
            type: 'fadeIn',
            duration: 750
        }
    }

});