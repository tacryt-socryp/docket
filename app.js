/*
 * File: app.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.2.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

//@require @packageOverrides
Ext.Loader.setConfig({

});

Ext.application({
    models: [
        'roomList'
    ],
    stores: [
        'MyStore'
    ],
    views: [
        'drawComponent'
    ],
    name: 'Booking',

    launch: function() {
        var drawComponent = Ext.create('Ext.draw.Component', {
            width: 800,
            height: 600,
            renderTo: document.body
        }),
        surface = drawComponent.surface;

        surface.add([{
            type: 'circle',
            radius: 10,
            fill: '#f00',
            x: 10,
            y: 10,
            group: 'circles'
        }, {
            type: 'circle',
            radius: 10,
            fill: '#0f0',
            x: 50,
            y: 50,
            group: 'circles'
        }, {
            type: 'circle',
            radius: 10,
            fill: '#00f',
            x: 100,
            y: 100,
            group: 'circles'
        }, {
            type: 'rect',
            width: 20,
            height: 20,
            fill: '#f00',
            x: 10,
            y: 10,
            group: 'rectangles'
        }, {
            type: 'rect',
            width: 20,
            height: 20,
            fill: '#0f0',
            x: 50,
            y: 50,
            group: 'rectangles'
        }, {
            type: 'rect',
            width: 20,
            height: 20,
            fill: '#00f',
            x: 100,
            y: 100,
            group: 'rectangles'
        }]);

        // Get references to my groups
        circles = surface.getGroup('circles');
        rectangles = surface.getGroup('rectangles');

        // Animate the circles down
        circles.animate({
            duration: 1000,
            to: {
                translate: {
                    y: 200
                }
            }
        });

        // Animate the rectangles across
        rectangles.animate({
            duration: 1000,
            to: {
                translate: {
                    x: 200
                }
            }
        });
        Ext.create('Booking.view.drawComponent', {fullscreen: true});
    }

});
