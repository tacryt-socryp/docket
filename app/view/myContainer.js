Ext.define('Confluent.view.myContainer', {
    extend: 'Ext.Container',
    alias: 'widget.myContainer',

    requires: [
        'Ext.draw.Component'
    ],

    config: {
        itemId: 'myContainer',
        autoDestroy: false,
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        items: [{
            xtype: 'draw',
            events: [],
            itemId: 'inlineDraw',
            autoDestroy: false,
            listeners: [{

fn: function(element, eOpts) {
    var me = this,
        backgroundColor = me.backgroundColor,
        timelineColor = me.timelineColor,
        roomText = me.roomText,
        boxColor = me.boxColor,
        dotColor = me.dotColor,
        events = me.events;

    var mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0],
        displace = Ext.getBody().getSize().width - 200,
        h = Ext.getBody().getSize().height,
        surface = me.getSurface('main'),
        today = new Date(Date.now()),
        w = 210 * events.length,
        vDisplaceSumm,
        vDisplaceDesc,
        description,
        dateTime,
        dateStart,
        dateEnd,
        summary,
        yloc = h/10,
        xloc;

    if (w < Ext.getBody().getSize().width) {
        w = Ext.getBody().getSize().width;
    }

    me.setSize(w,h);
    surface.setSize(w,h);
    surface.setBackground(backgroundColor);
    
function addRect(fillColor,h,w,x,y) {
    surface.add({
        type: 'rect',
        fill: fillColor,
        height : h,
        width: w,
        x: x,
        y: y
    }).show(true);
}

function addText(fillColor,font,text,x,y) {
    surface.add({
        type: 'text',
        text: text,
        font: font,
        fill: fillColor,
        x: x,
        y: y
    }).show(true);
}
    
function addCircle(fillColor,r,x,y) {
    surface.add({
        type: 'circle',
        cx: x,
        cy: y,
        r: r,
        fillStyle: fillColor
    }).show(true);
}
    
function addTriangle(fillColor,x,y) {
    surface.add({
        type: 'path',
        path: 'M ' + x + ' ' + y + ' ' +
                'l ' + -25 + ' ' + 0 + ' ' +
                'l ' + 12 + ' ' + -10 + 'z',
        fillStyle: fillColor
    }).show(true);
}

    //Line across screen
    addRect(timelineColor, 20, w, 0, yloc+330);

    //Name of room
    addText("#fff", "40px Arial", roomText, 35, 70);
    addText("#fff", "36px Arial", "+add", displace, 70);

    for (var iter = 0; iter < events.length; iter++) {
        xloc = iter*200;
        summary = events[iter].summary;
        description = events[iter].description;
        vDisplaceSumm = 0;
        vDisplaceDesc = 0;

        try {
            summary = summary.replace(/\s+/g,' ');
            if (summary.length > 24) {
                for (var a = 24; a > 0; a--) {
                    if (summary.substring(a, a+1) == ' ') {
                        summary = summary.substring(0,a) + '\n' + summary.substring(a+1);
                        vDisplaceSumm = 20;
                        a = 0;
                    }
                }
                if (summary.length > 48) {
                    summary = summary.substring(0,48) + '...';
                }
            }
        } catch(e) {
            summary = '';
        }

        try {
            description = description.replace(/\s+/g,' ');
            description = description.replace(/(\r\n|\n|\r)/gm,' ');
            if (description.length > 35) {
                for (var b = 35; b > 0; b--) {
                    if (description.substring(b, b+1) == ' ') {
                        description = description.substring(0,b) + '\n' + description.substring(b+1);
                        b = 0;
                    }
                }
                if (description.length > 70) {
                    for (var c = 70; c > 0; c--) {
                        if (description.substring(c, c+1) == ' ') {
                            if (description.length > 103) {
                                description = description.substring(0,c) + '\n' + description.substring(c+1,103) + '...';
                            } else {
                                description = description.substring(0,c) + '\n' + description.substring(c+1);
                            }
                            vDisplaceDesc = 20;
                            c = 0;
                        }
                    }
                }
            }
        } catch(e) {
            description = false;
        }

        dateTime = events[iter].start.dateTime;
        dateTime = Date.parse(dateTime);
        dateTime = new Date(dateTime);

        if ((dateTime.getDate() == today.getDate()) && (dateTime.getMonth() == today.getMonth())) {
            dateTime = dateTime.toTimeString().substring(0,5);
            if (parseInt(dateTime.substring(0,2),10) >= 12) {
                if (dateTime.substring(0,2) == '12') {
                    dateTime = dateTime + ' pm';
                } else if ((parseInt(dateTime.substring(0,2),10)-12) < 10) {
                    dateTime = '0' + (parseInt(dateTime.substring(0,2),10)-12) + dateTime.substring(2) + ' pm';
                } else {
                    dateTime = (parseInt(dateTime.substring(0,2),10)-12) + dateTime.substring(2) + ' pm';
                }
            } else {
                if (dateTime.substring(0,1) == '0') {
                    dateTime = '12' + dateTime.substring(2) + ' am';
                } else if (parseInt(dateTime.substring(0,2),10) < 10) {
                    dateTime = '0' + dateTime + ' am';
                } else {
                    dateTime = dateTime + ' am';
                }
            }

        } else if (dateTime.getMonth() == today.getMonth()) {
            dateTime = dateTime.toDateString().substring(0,10);
        } else {
            dateTime = dateTime.toDateString().substring(0,10);
        }

        dateStart = events[iter].start.dateTime;
        dateStart = Date.parse(dateStart);
        dateStart = new Date(dateStart);
        dateEnd = events[iter].end.dateTime;
        dateEnd = Date.parse(dateEnd);
        dateEnd = new Date(dateEnd);

        dateStart = dateStart.toTimeString().substring(0,5);
        if (parseInt(dateStart.substring(0,2),10) >= 12) {
            if (dateStart.substring(0,2) == '12') {
                dateStart = dateStart + ' pm';
            } else if ((parseInt(dateStart.substring(0,2),10)-12) < 10) {
                dateStart = '0' + (parseInt(dateStart.substring(0,2),10)-12) + dateStart.substring(2) + ' pm';
            } else {
                dateStart = (parseInt(dateStart.substring(0,2),10)-12) + dateStart.substring(2) + ' pm';
            }
        } else {
            if (dateStart.substring(0,1) == '0') {
                dateStart = '12' + dateStart.substring(2) + ' am';
            } else if (parseInt(dateStart.substring(0,2),10) < 10) {
                dateStart = '0' + dateStart + ' am';
            } else {
                dateStart = dateStart + ' am';
            }
        }

        dateEnd = dateEnd.toTimeString().substring(0,5);
        if (parseInt(dateEnd.substring(0,2),10) >= 12) {
            if (dateEnd.substring(0,2) == '12') {
                dateEnd = dateEnd + ' pm';
            } else if ((parseInt(dateEnd.substring(0,2),10)-12) < 10) {
                dateEnd = '0' + (parseInt(dateEnd.substring(0,2),10)-12) + dateEnd.substring(2) + ' pm';
            } else {
                dateEnd = (parseInt(dateEnd.substring(0,2),10)-12) + dateEnd.substring(2) + ' pm';
            }
        } else {
            if (dateEnd.substring(0,1) == '0') {
                dateEnd = '12' + dateEnd.substring(2) + ' am';
            } else if (parseInt(dateEnd.substring(0,2),10) < 10) {
                dateEnd = '0' + dateEnd + ' am';
            } else {
                dateEnd = dateEnd + ' am';
            }
        }

        //Larger Point on timeline
        addCircle(dotColor,22,xloc+192,yloc+338);
        
        //Smaller Point on timeline
        addCircle(boxColor,16,xloc+192,yloc+338);

        if (iter % 2 === 0) {
            addRect(boxColor,160,300,xloc+38,yloc+110);
            addText("#fff", "22px Arial", summary, xloc+48, yloc+135+vDisplaceSumm);

            addTriangle(boxColor, xloc+178, yloc+270);

            if (description !== false) {
                addText("#fff", "16px Times New Roman", description, xloc+48,
                    yloc+190+vDisplaceDesc+vDisplaceSumm);
            }
            
            //Time text
            addText("#fff", "14px Arial", dateStart + ' - ' + dateEnd, xloc+121, yloc+260);

            //Date text
            addText("#fff", "14px Arial", dateTime, xloc+165, yloc+380);
            
        } else {
            
            addRect(boxColor, 160, 300, xloc+38, yloc+410);
            
            addTriangle(boxColor,xloc+203,yloc+410);
            
            addText("#fff", "22px Arial", summary, xloc+48, yloc+435+vDisplaceSumm);

            if (description !== false) {
                addText("#fff", "16px Times New Roman", description, xloc+48,
                    yloc+485+vDisplaceSumm+vDisplaceDesc);
            }
            
            //Time text
            addText("#fff", "14px Arial", dateStart + " - " + dateEnd, xloc+121, yloc+560);

            //Date text
            addText("#fff", "14px Arial", dateTime, xloc+165, yloc+308);
        }
    }
},
event: 'painted'},
{
    fn: function(element, eOpts) {
        this.setSize(null, Ext.getBody().getSize().height);
        this.getSurface('main').setSize(null, Ext.getBody().getSize().height);
    },
    event: 'resize'
}]
        }]
    },

    initialize: function() {
        var me = this;
        me.callParent();

        me.element.on({
            tap: me.onTap
        });

        window.setInterval(function() {me.reloadData();},900000);
    },

    onTap: function(e) {
        if (e.pageY <= 70) {
            if (e.pageX >= Ext.getBody().getSize().width-200) {
                var form = new Confluent.view.MyFormPanel();
                Ext.Viewport.add(form);
            }
        }
    },

    reloadData: function() {
var me = this,
    today = new Date(),
    mainCarousel,
    calendarId = me.calendarId,
    child;

var token = Confluent.app.authToken,
    clientId = '464168127252.apps.googleusercontent.com',
    apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
    scopes = 'https://www.googleapis.com/auth/calendar';

today.setHours(0,0,0,0);
today = today.toISOString();

gapi.client.setApiKey(apiKey);
gapi.auth.setToken(token);

gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
function(authResult) {
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
                child = me.query('#inlineDraw')[0];
                child.events = resp.items;
                child.fireEvent('painted',child);
            });
        });
    } else {
        window.location.reload();
    }
});

    }
});