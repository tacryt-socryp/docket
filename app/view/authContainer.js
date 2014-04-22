Ext.define('Docket.view.authContainer', {
    extend: 'Ext.Container',

    config: {
        itemId: 'authContainer',
        style: 'background-color:##2c3e50',
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
    var parameters = {};
        
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        parameters[key] = value;
    });

    function isEmpty(ob) {
        for (var i in ob) {
            return false;
        }
        return true;
    }

    if (isEmpty(parameters)) {
        window.location.href = 'login.html';
    } else {
        var h = Ext.getBody().getSize().height,
            w = Ext.getBody().getSize().width;
        Ext.create('Docket.view.formPanel');
        Ext.create('Docket.view.portCarousel');
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
                    if (a == outer.items.length-1) {
                        me.loadData(outer.items[a].id, outer.items[a].summary, true);
                    } else {
                        me.loadData(outer.items[a].id, outer.items[a].summary, false);
                    }
                }
            });
        });
    }
    });
},

loadData: function(calendarId, summary, lastCal) {
    var me = this,
        today = new Date(),
        h = Ext.getBody().getSize().height,
        w = Ext.getBody().getSize().width,
        child;

    var token = Docket.app.authToken,
        clientId = '464168127252.apps.googleusercontent.com',
        apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
        scopes = 'https://www.googleapis.com/auth/calendar';

    var colors = [
        { //Turquoise
            'timeline':'#16a085',
            'box':'#1abc9c',
        },
        { //Blue
            'timeline':'#2980b9',
            'box':'#3498db',
        },
        { //Purple
            'timeline':'#8e44ad',
            'box':'#9b59b6',
        },
        { //Green
            'timeline':'#27ae60',
            'box':'#31cd73',
        },
        { //Red
            'timeline':'#c0392b',
            'box':'#e74c3c',
        }
    ];

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
        'maxResults': 70
    });

    request.execute(function(resp) {
        console.log(resp)
if (Ext.isDefined(resp) && Ext.isDefined(resp.items) && Ext.isDefined(resp.items[0]) && Ext.isDefined(resp.items[0].summary) && Ext.isDefined(resp.items[0].summary.length)) {
    if(summary.indexOf("birthdays and events") == -1 && summary.indexOf("Holidays") == -1){

        obj = new Docket.view.portContainer();
        array_i = Ext.ComponentQuery.query('#inlinePortDraw').length - 1;
        child = Ext.ComponentQuery.query('#inlinePortDraw')[array_i];
        
        if(array_i > 4) {
            array_i = 0;
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
        
        if (me.getItemId() == Ext.Viewport.getActiveItem().getItemId()) {
            Ext.Viewport.setActiveItem('portCarousel');
        }
    }
} else {
    if (lastCal) {
       gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'singleEvents': true,
            'orderBy': 'startTime',
            'timeMin': today,
            'maxResults': 70
        });
            
        request.execute(function(resp) {
            obj = new Docket.view.portContainer();
            array_i = Ext.ComponentQuery.query('#inlinePortDraw').length - 1;
            child = Ext.ComponentQuery.query('#inlinePortDraw')[array_i];
            
            mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0];

            obj.roomText = summary;
            obj.calendarId = calendarId;

            child.roomText = summary;
            child.backgroundColor = "#2c3e50";
            child.boxColor = colors[array_i].box;
            child.timelineColor = colors[array_i].timeline;
            child.events = [];
            
            mainCarousel.add(obj);
            
            if (me.getItemId() == Ext.Viewport.getActiveItem().getItemId()) {
                Ext.Viewport.setActiveItem('portCarousel');
            }
        });
    });
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