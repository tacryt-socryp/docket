Ext.define('Docket.view.landCarousel', {
    extend: 'Ext.carousel.Carousel',
    alias: 'widget.landCarousel',

    requires: [
        'Docket.view.landContainer'
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