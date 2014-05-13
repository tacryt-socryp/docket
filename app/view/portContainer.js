Ext.define('Docket.view.portContainer', {
    extend: 'Ext.Container',
    alias: 'widget.portContainer',

    requires: [
        'Ext.draw.Component'
    ],

    config: {
        itemId: 'portContainer',
        autoDestroy: false,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype: 'draw',
            events: [],
            itemId: 'inlinePortDraw',
            autoDestroy: true,
            listeners: [{
fn: function(element, eOpts) {
    var me = this,
        backgroundColor = me.backgroundColor,
        timelineColor = me.timelineColor,
        roomText = me.roomText,
        boxColor = me.boxColor,
        events = me.events;

    var mainCarousel = me.parent.parent,
        h = Ext.getBody().getSize().height,
        w = Ext.getBody().getSize().width,
        surface = me.getSurface('main'),
        today = new Date(Date.now()),
        vDisplaceSumm,
        vDisplaceDesc,
        description,
        dateTime,
        dateStart,
        dateEnd,
        summary,
        yloc = h/10,
        xloc = w/12,
        m = Ext.draw.TextMeasurer;

    
    mainCarousel.element.dom.style.background = backgroundColor;
    
    if ((210 * events.length + 90) > h) {
        h = 210 * events.length + 90;
    }
    
    me.setSize(w,h);
    surface.setSize(w,h);
    addRect(backgroundColor,w,h,0,0,0);
    
    setTimeout(function(){
        for (var x=0; x < document.getElementsByClassName("x-container x-draw-component x-paint-monitored x-size-monitored x-sized").length; x++) {
        
            if (document.getElementsByClassName("x-container x-draw-component x-paint-monitored x-size-monitored x-sized")[x].id == me.element.getId()) {
                document.getElementsByClassName("x-container x-draw-component x-paint-monitored x-size-monitored x-sized")[x].style.cssText = "width: 100% !important; height: " + h + "px !important;";
        }
    }
    }, 1000);
    
    //Line across screen
    addRect(timelineColor, 20, h, 10, 0, 0);

    //Name of room
    addText("#fff", "20px OpenSans", roomText, 33, 30);
    addRect(boxColor, 40, 40, w-55, 5, 3);
    addText("#fff", "28px OpenSans", "+", w-43, 36);
    
function addRect(fillColor,w,h,x,y,r) {
    surface.add({
        type: 'rect',
        fill: fillColor,
        width: w,
        height : h,
        x: x,
        y: y,
        radius: r
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
    
function processDate(dateDate) {
    dateDate = Date.parse(dateDate);
    dateDate = new Date(dateDate);

    dateDate = dateDate.toTimeString().substring(0,5);
    if (parseInt(dateDate.substring(0,2),10) >= 12) {
        if (dateDate.substring(0,2) == '12') {
            dateDate = dateDate + 'pm';
        } else if ((parseInt(dateDate.substring(0,2),10)-12) < 10) {
            dateDate = (parseInt(dateDate.substring(0,2),10)-12) + dateDate.substring(2) + 'pm';
        } else {
            dateDate = (parseInt(dateDate.substring(0,2),10)-12) + dateDate.substring(2) + 'pm';
        }
    } else {
        if (dateDate.substring(0,1) == '0') {
            dateDate = '12' + dateDate.substring(2) + 'am';
        } else if (parseInt(dateDate.substring(0,2),10) < 10) {
            dateDate = dateDate + 'am';
        } else {
            dateDate = dateDate + 'am';
        }
    }

    return dateDate;
}
    
function processSummary(summary) {
    try {
    vDisplaceSumm = 0;
    summary = summary.replace(/\s+/g,' ')
    var measured = m.measureTextSingleLine(summary,"22px OpenSans").width;
    var divider = parseInt(measured/(xloc*9.3)); // Number of splits
        
        
    var sum = 0;
for (var a = 0; a < divider; a++) {
    
    for (var b = parseInt((summary.length/divider)*(a+1)); b > 0; b--) {
        if (a > 0) {
            summary = summary.substring(0,(summary.length/divider)*(a+1)) + '...';
            vDisplaceSumm = vDisplaceSumm+20;
            a = divider;
            sum = 0;
        } else {
            if (summary.substring(b, b+1) == ' ') {
            if (m.measureTextSingleLine(summary.substring(0, b),"22px OpenSans").width < (xloc*9.3)) {
                summary = summary.substring(0,b) + '\n' + summary.substring(b+1);
                b = 0;
                vDisplaceSumm = vDisplaceSumm+20;
            }
            }
        }
    }
}
    } catch(e) {
        summary = false;
    }
    
    return summary;
}
    
function processDescription(description) {
    try {
    vDisplaceDesc = 0;
    description = description.replace(/\s+/g,' ')
    description = description.replace(/(\r\n|\n|\r)/g,' ');
    var measured = m.measureTextSingleLine(description,"16px OpenSans").width;
    var divider = parseInt(measured/(xloc*9.8)); // Number of splits
        
        
    var sum = 0;
    var noSpaces = true;
for (var a = 0; a < divider; a++) {
    
    for (var b = parseInt((description.length/divider)*(a+1)); b > 0; b--) {
        if (a > 0) {
            if (description.substring(b, b+1) == ' ') {

            if (m.measureTextSingleLine(description.substring(0, b),"16px OpenSans").width 
                        - (xloc*9.8) - sum < (xloc*9.5)) {
                sum = m.measureTextSingleLine(description.substring(0, b),"16px OpenSans").width - (xloc*9.8);
                
                description = description.substring(0,b) + '\n' + description.substring(b+1);
                b = 0;
                noSpaces = false;
                vDisplaceDesc = vDisplaceDesc+5;
            }
            }
        } else {
            if (description.substring(b, b+1) == ' ') {
            if (m.measureTextSingleLine(description.substring(0, b),"16px OpenSans").width 
                        - sum < (xloc*9.5)) {
                sum = m.measureTextSingleLine(description.substring(0, b),"16px OpenSans").width - (xloc*9.8);
                
                description = description.substring(0,b) + '\n' + description.substring(b+1);
                b = 0;
                noSpaces = false;
                vDisplaceDesc = vDisplaceDesc+5;
            }
            }
        }
    }

    if (a == 2) {
        description = description.substring(0,(description.length/divider)*(a+1)) + '...';
        vDisplaceDesc = vDisplaceDesc+5;
        a = divider;
        sum = 0;
    }
}       
        
    if (measured > (xloc*9.8)) {
        if (noSpaces) {
            for (var b = description.length; b > 0; b--) {
                if (m.measureTextSingleLine(description.substring(0, b),"16px OpenSans").width
                        < (xloc*9)) {
                    description = description.substring(0,b) + '...';
                    b = 0;
                }
            }
        } else {
            var descriptionCheck = description.split('\n');
            for (var x = 0; x < descriptionCheck.length; x++) {
                if (m.measureTextSingleLine(descriptionCheck[x],"16px OpenSans").width > (xloc*9.5)) {
                    for (var y = descriptionCheck[x].length; y > 0; y--) {
                        if (m.measureTextSingleLine(descriptionCheck[x].substring(0,y),"16px OpenSans").width < (xloc*9.5)) {
                            descriptionCheck[x] = descriptionCheck[x].substring(0,y);
                            y = 0;
                        }
                    }
                }
            }

            description = descriptionCheck.join('\n');
        }
    }

} catch(e) {
    description = false;
}
    
    return description;
}
    
function portraitRender(summary,description,dateStart,dateEnd,dateTime,xloc,yloc,i){
    //Point on timeline
    addCircle(boxColor,16,20,yloc+175);

    addRect(boxColor,(xloc*10),170,(xloc*1.5),yloc+90,3);
    
    if (summary !== false) {
        addText("#fff", "22px OpenSans", summary, (xloc*1.7), yloc+118+vDisplaceSumm);
    }

    if (description !== false) {
        addText("#fff", "16px OpenSans", description, (xloc*1.7),
            yloc+173+vDisplaceDesc+vDisplaceSumm);
    }

    //Time text
    addText("#fff", "15px OpenSans", dateStart + ' - ' + dateEnd, (xloc*6.5)-65, yloc+250);

    //Date text
    addText("#fff", "15px OpenSans", dateTime, (xloc*9.6), yloc+250);
}


for (var iter = 0; iter < events.length; iter++) {
    vDisplaceDesc = 0;
    summary = processSummary(events[iter].summary);
    description = processDescription(events[iter].description);

    dateTime = events[iter].start.dateTime;

    if (typeof dateTime === 'undefined') {
        dateTime = events[iter].start.date;
        dateStart = "12:00am";
        dateEnd = "11:59pm";
    } else {
        dateStart = processDate(events[iter].start.dateTime);
        dateEnd = processDate(events[iter].end.dateTime);
    }
    
    date = new Date(Date.parse(dateTime));

    if (date.getFullYear() == today.getFullYear() && date.getDate() == today.getDate() && date.getMonth() == today.getMonth()) {
        dateTime = 'Today';
    } else {
        if (today.getMonth() == date.getMonth() && today.getDate() < parseInt(date.toDateString().substring(8,10)) && today.getDate()+7 > parseInt(date.toDateString().substring(8,10))) {
            dateTime = date.toDateString().substring(0,3);
            
            if (dateTime == "Mon") {
                dateTime = "    Mon";
            } else if (dateTime == "Tue") {
                dateTime = "    Tue";
            } else if (dateTime == "Wed") {
                dateTime = "    Wed";
            } else if (dateTime == "Thu") {
                dateTime = "  Thurs";
            } else if (dateTime == "Fri") {
                dateTime = "    Fri";
            } else if (dateTime == "Sat") {
                dateTime = "    Sat";
            } else {
                dateTime = "    Sun";
            }
        } else {
            dateTime = date.toDateString().substring(4,10);
            if (dateTime.substring(4,5) == "0") {
                dateTime = ' ' + dateTime.substring(0,4) + dateTime.substring(5);
            }
        }
    }
    
    yloc = iter*200;
    portraitRender(summary, description, dateStart, dateEnd, dateTime, xloc, yloc, iter);
}
},
event: 'painted'}]
        }]
    },

    initialize: function() {
        var me = this,
            canvas = me.items.items[0],
            w = Ext.getBody().getSize().width;

        canvas.yScrollPosition = 0;
        me.callParent();

        canvas.element.on({
            tap: function(e){
                console.log(e);
                me.onTap(e,canvas,w);
            },
            taphold: function(e){
                e.stopPropagation();
                var editDelete = new Ext.MessageBox({
                    hideOnMaskTap: true
                });
                
                editDelete.setMessage('Delete event?');
                editDelete.setButtons([
                    /*{
                        xtype: 'button',
                        text: 'Edit',
                        itemId: 'ok',
                        ui: 'action',
                        handler: function(button) {
                            me.editEvent(e,canvas,w);
                            editDelete.hide();
                        }
                    },*/
                    {
                        xtype: 'button',
                        text: 'Delete',
                        itemId: 'yes',
                        ui: 'action',
                        handler: function(button) {
                            me.deleteEvent(e,canvas,w);
                            editDelete.hide();
                        }
                    }
                ]);
                
                editDelete.show();
            }
        });
        
        me.getScrollable().getScroller().on({
            scrollend: function(e){
                me.onScroll(e,canvas);
            },
            scope: me.getScrollable().getScroller()
        });

        setTimeout(function() {
            me.reloadData.call(me);
        },900000);
    },

    onTap: function(e,canvas,w) {
        var yPos = e.pageY + canvas.yScrollPosition;
        if (yPos <= 80 && e.pageX >= w-80) {
            var form = new Docket.view.formPanel();
            Ext.Viewport.add(form);
        } else if (e.pageX > (w/12)*1.6 && e.pageX < (w/12)*11.4) {
            var remainder = (yPos-90)%200,
                boxNum = -1;
            
            if (e.touch.timeStamp === e.timeStamp &&
                remainder > 15 && remainder < 140) {
                boxNum = parseInt((yPos-90)/200);
                if (boxNum < canvas.events.length && typeof canvas.events[boxNum].description !== "undefined") {
                    var description = canvas.events[boxNum].description.split(/[\n\s]/g);
                    
                    var search = -1;
                    for (var a=0; a < description.length; a++) {
                        search = description[a].search('://');
                        if (search > -1) {
                            window.location.href = description[a];
                        }
                    }
                }
            }
        }
    },
    
    onScroll: function(e,canvas) {
        canvas.yScrollPosition = e.position.y;
    },
    
    editEvent: function(e,canvas,w) {
var me = this,
    child = me.items.items[0],
    yPos = e.pageY + canvas.yScrollPosition;
        
function editRequest(event) {
    var token = Docket.app.authToken,
        clientId = '464168127252.apps.googleusercontent.com',
        apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
        scopes = 'https://www.googleapis.com/auth/calendar',
        calendarId = me.calendarId,
        form = new Docket.view.editPanel();
        
    
    try {
        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);
    } catch(e) {
        window.location.reload();
    }

    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
        if (authResult) {
            gapi.client.load('calendar', 'v3', function() {
                console.log('EDITED');
                var request = gapi.client.calendar.events.delete({
                    'calendarId': calendarId,
                    'eventId': eventId
                });
                request.execute(function(resp) {
                    form.originalEvent = event;
                    Ext.Viewport.add(form);
                });
            });
        }
    });
}
        
if (yPos > 80 && e.pageX > (w/12)*1.6 && e.pageX < (w/12)*11.4) {
    var remainder = (yPos-90)%200,
        boxNum = -1;

    if (remainder > 15 && remainder < 140) {
        boxNum = parseInt((yPos-90)/200);
        if (boxNum >= 0) {
            editRequest(child.events[boxNum]);
        }
    }
}
        
    },
    
    deleteEvent: function(e,canvas,w) {
var me = this,
    child = me.items.items[0],
    yPos = e.pageY + canvas.yScrollPosition;

function deleteRequest(eventId) {
    var token = Docket.app.authToken,
        clientId = '464168127252.apps.googleusercontent.com',
        apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
        scopes = 'https://www.googleapis.com/auth/calendar',
        calendarId = me.calendarId;
        
    
    try {
        gapi.client.setApiKey(apiKey);
        gapi.auth.setToken(token);
    } catch(e) {
        window.location.reload();
    }

    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
        if (authResult) {
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.delete({
                    'calendarId': calendarId,
                    'eventId': eventId
                });
                request.execute(function(resp) {
                    setTimeout(function(){
                        me.reloadRequest.call(me);
                    }, 1000);
                });
            });
        }
    });
}

if (yPos > 80 && e.pageX > (w/12)*1.6 && e.pageX < (w/12)*11.4) {
    var remainder = (yPos-90)%200,
        boxNum = -1;

    if (remainder > 15 && remainder < 140) {
        boxNum = parseInt((yPos-90)/200);
        if (boxNum >= 0) {
            deleteRequest(child.events[boxNum].id);
        }
    }
}
    },
    
    reloadRequest: function() {
        
var me = this,
    today = new Date(),
    nextYear = new Date(),
    calendarId = me.calendarId,
    child = me.items.items[0],
    token = Docket.app.authToken,
    clientId = '464168127252.apps.googleusercontent.com',
    apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
    scopes = 'https://www.googleapis.com/auth/calendar';

nextYear.setFullYear(today.getFullYear());
nextYear = nextYear.toISOString();

today = today.toISOString();

gapi.client.setApiKey(apiKey);
gapi.auth.setToken(token);
        
gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
    gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
            'calendarId': calendarId,
            'singleEvents': true,
            'orderBy': 'startTime',
            'timeMin': today
        });
        request.execute(function(resp) {
            if (Ext.isDefined(resp) && Ext.isDefined(resp.items) && Ext.isDefined(resp.items[0])) {
                child.events = resp.items;
                child.element.redraw();
            } else {
                setTimeout(function(){
                    me.reloadRequest.call(me);
                }, 2500);
            }
        });
    });
});
    },

    reloadData: function() {
        var me = this;
        
        setTimeout(function(){
            me.reloadRequest.call(me);
        }, 1000);
        
        setTimeout(function() {
            me.reloadData.call(me);
        }, 900000);
}
});