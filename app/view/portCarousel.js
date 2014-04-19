Ext.define('Docket.view.portCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.portCarousel',

    requires: [
        'Docket.view.portContainer'
    ],

    config: {
        fullscreen: true,
        itemId: 'mainCarousel',
        ui: 'light',
        direction: 'horizontal',
        showAnimation: {
            type: 'fadeIn',
            duration: 750
        }
    }

});