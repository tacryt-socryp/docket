Ext.define('Docket.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        itemId: 'authContainer',
        listeners: [
            {
                fn: 'onContainerPainted',
                event: 'painted'
            },
            {
                fn: 'onAuthContainerDeactivate',
                event: 'deactivate'
            }
        ]
    },

onContainerPainted: function(element, eOpts) {
    var parameters = {},
        h = Ext.getBody().getSize().height,
        w = Ext.getBody().getSize().width,
        landscape = (w > h && h > (h/10)+560);
        
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        parameters[key] = value;
    });

    Ext.create('Docket.view.formPanel');
    if (landscape) {
        Ext.create('Docket.view.landCarousel');
    } else {
        Ext.create('Docket.view.portCarousel');
    }

    function isEmpty(ob) {
        for (var i in ob) {
            return false;
        }
        return true;
    }

    if (isEmpty(parameters)) {
        window.location.href = 'login.html';
    } else {
        Docket.app.authToken = decodeURI(parameters.auth);
        this.generateItems();
    }
},

onAuthContainerDeactivate: function(oldActiveItem, container, newActiveItem, eOpts) {
    oldActiveItem.destroy();
},

generateItems: function() {
    var me = this,
        token = Docket.app.authToken,
        clientId = '464168127252.apps.googleusercontent.com',
        apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
        scopes = 'https://www.googleapis.com/auth/calendar';

    try {
        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);
    } catch(e) {
        window.location.reload();
    }

    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
    if (authResult) {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function(outer) {
                for (var a = 0; a < outer.items.length; a++) {
                    me.loadData(outer.items[a].id, outer.items[a].summary);
                }
            });
        });
    }
    });
},

loadData: function(calendarId, summary) {
    var me = this,
        today = new Date(),
        h = Ext.getBody().getSize().height,
        w = Ext.getBody().getSize().width,
        landscape = (w > h && h > (h/10)+560),
        child;

    var token = Docket.app.authToken,
        clientId = '464168127252.apps.googleusercontent.com',
        apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
        scopes = 'https://www.googleapis.com/auth/calendar';

    var colors = [
        {
            'box':'#16a085',
            'timeline':'#1abc9c',
        },
        {
            'box':'#2980b9',
            'timeline':'#3498db',
        },
        {
            'box':'#c0392b',
            'timeline':'#e74c3c',
        },
        {
            'box':'#27ae60',
            'timeline':'#31cd73',
        },
        {
            'box':'#8e44ad',
            'timeline':'#9b59b6',
        }
    ];

    today.setHours(0,0,0,0);
    today = today.toISOString();

    gapi.client.setApiKey(apiKey);
    gapi.auth.setToken(token);

gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
if (authResult) {
gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
        'calendarId': calendarId,
        'singleEvents': true,
        'orderBy': 'startTime',
        'timeMin': today,
        'maxResults': 50
    });

    request.execute(function(resp) {
if (Ext.isDefined(resp) && Ext.isDefined(resp.items) && Ext.isDefined(resp.items[0]) && Ext.isDefined(resp.items[0].summary) && Ext.isDefined(resp.items[0].summary.length)) {
    if(summary.indexOf("birthdays and events") == -1 && summary.indexOf("Holidays") == -1){
        if (landscape) {
            obj = new Docket.view.landContainer();
            array_i = Ext.ComponentQuery.query('#inlineLandDraw').length - 1;
            child = Ext.ComponentQuery.query('#inlineLandDraw')[array_i];
        } else {
            obj = new Docket.view.portContainer();
            array_i = Ext.ComponentQuery.query('#inlinePortDraw').length - 1;
            child = Ext.ComponentQuery.query('#inlinePortDraw')[array_i];
        }
        
        mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0];

        obj.roomText = summary;
        obj.calendarId = calendarId;

        child.roomText = summary;
        child.backgroundColor = "#2c3e50";
        child.boxColor = colors[array_i].box;
        child.timelineColor = colors[array_i].timeline;
        child.events = resp.items;
        
        mainCarousel.add(obj);
        
        if (landscape) {
            if (me.getItemId() == Ext.Viewport.getActiveItem().getItemId()) {
                Ext.Viewport.setActiveItem('landCarousel');
            }
        } else {
            if (me.getItemId() == Ext.Viewport.getActiveItem().getItemId()) {
                Ext.Viewport.setActiveItem('portCarousel');
            }
        }
    }
}
        
});
});
} else {
    window.location.reload();
}
    });
    }

});