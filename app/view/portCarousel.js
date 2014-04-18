Ext.define('Confluent.view.portCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.portCarousel',

    requires: [
        'Confluent.view.portContainer'
    ],

    config: {
        fullscreen: true,
        itemId: 'portCarousel',
        ui: 'light',
        direction: 'horizontal',
        showAnimation: {
            type: 'fadeIn',
            duration: 750
        }
    }

});