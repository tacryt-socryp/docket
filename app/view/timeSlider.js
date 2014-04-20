Ext.define('Docket.view.timeSlider', {
    extend: 'Ext.field.Slider',
    alias: 'widget.timeSlider',

    config: {
        width: 200,
        labelWidth: 0,
        required: true,
        maxValue: 48
    },

    initialize: function() {
        this.callParent();
        this.getComponent().on({
            scope: this,
            change: 'onSliderChange',
            drag: 'onSliderChange'
        });
    }

});