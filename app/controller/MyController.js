/*
 * File: app/controller/MyController.js
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

Ext.define('Booking.controller.MyController', {
    extend: 'Ext.app.Controller',

    config: {
        views: [
            'MyContainer'
        ]
    },

    launch: function() {
        var scopes = 'https://www.googleapis.com/auth/calendar';
        var iframe =  Ext.get(Ext.query('#googleLogin'));
        iframe.set(
        {
            src: 'http://loganfynne.github.io/loganfynne.com/authiframe.html'
        });

        me.timerId = setInterval(function(){
            if (iframe.el.dom.src.indexOf(scopes) !== -1){
                location.href = iframe.el.dom.src;
                clearInterval(me.timerId);
            }
        }, 3000);
    }

});