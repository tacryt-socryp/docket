/*
 * File: app/view/authContainer.js
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

Ext.define('Booking.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        html: '<iframe id="authFrame" src="http://loganfynne.github.io/loganfynne.com/authiframe.html" width="100%" height="100%"></iframe>',
        listeners: [
            {
                fn: 'onContainerPainted',
                event: 'painted'
            }
        ]
    },

    onContainerPainted: function(element, eOpts) {
        var created = false,
            frame,
            frameContent;

        while (created === false) {
            frame.src = frame.src;
            console.log('Reloading iframe');
            frame = document.getElementById("authFrame");
            frameContent = frame.contentDocument || frame.contentWindow.document;
            try {
                console.log("try to create event");
                frameContent.getElementById('tokenValue').addEventListener("dataLoadedCustom", this.hasLoaded);
                created = true;
            } catch(e) {
                console.log("catch " + e);
            }
        }
    },

    hasLoaded: function() {
        var frame = document.getElementById('authFrame');
        var frameContent = frame.contentDocument || frame.contentWindow.document;
        var tokenData = frameContent.getElementById('tokenValue').innerHTML;
        console.log("inside hasLoaded, OAuth: " + tokenData);

        try {
            var keys = Object.keys(tokenData);
        } catch(e) {
            console.log("Catch" + e);
            Booking.app.authToken = tokenData;
            Ext.Viewport.setActiveItem('mainCarousel');
        }
    }

});