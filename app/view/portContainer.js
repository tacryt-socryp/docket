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
            autoDestroy: false,
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
    surface.setBackground(backgroundColor);
    
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
    addText("#fff", "20px Arial", roomText, 35, 35);
    addRect(boxColor, 40, 40, w-55, 7, 3);
    addText("#fff", "24px Arial", "+", w-42, 35);
    
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
    var measured = m.measureTextSingleLine(summary,"22px Arial").width;
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
            if (m.measureTextSingleLine(summary.substring(0, b),"22px Arial").width < (xloc*9.3)) {
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
    var measured = m.measureTextSingleLine(description,"16px Arial").width;
    var divider = parseInt(measured/(xloc*9.8)); // Number of splits
        
        
    var sum = 0;
    var noSpaces = true;
for (var a = 0; a < divider; a++) {
    
    for (var b = parseInt((description.length/divider)*(a+1)); b > 0; b--) {
        if (a > 0) {
            if (description.substring(b, b+1) == ' ') {

            if (m.measureTextSingleLine(description.substring(0, b),"16px Arial").width 
                        - (xloc*9.8) - sum < (xloc*9.5)) {
                sum = m.measureTextSingleLine(description.substring(0, b),"16px Arial").width - (xloc*9.8);
                
                description = description.substring(0,b) + '\n' + description.substring(b+1);
                b = 0;
                noSpaces = false;
                vDisplaceDesc = vDisplaceDesc+5;
            }
            }
        } else {
            if (description.substring(b, b+1) == ' ') {
            if (m.measureTextSingleLine(description.substring(0, b),"16px Arial").width 
                        - sum < (xloc*9.5)) {
                sum = m.measureTextSingleLine(description.substring(0, b),"16px Arial").width - (xloc*9.8);
                
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
    if (noSpaces && measured > (xloc*9.8)) {
        for (var b = description.length; b > 0; b--) {
            if (m.measureTextSingleLine(description.substring(0, b),"16px Arial").width
                        < (xloc*9)) {
                description = description.substring(0,b) + '...';
                b = 0;
            }
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
    addText("#fff", "22px Arial", summary, (xloc*1.6), yloc+115+vDisplaceSumm);

    if (description !== false) {
        addText("#fff", "16px Arial", description, (xloc*1.6),
            yloc+170+vDisplaceDesc+vDisplaceSumm);
    }

    //Time text
    addText("#fff", "15px Arial", dateStart + ' - ' + dateEnd, (xloc*6.5)-65, yloc+250);

    //Date text
    addText("#fff", "15px Arial", dateTime, (xloc*9.6), yloc+250);
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

    if ((date.getFullYear() == today.getFullYear()) && (date.getDate() == today.getDate()) && (date.getMonth() == today.getMonth())) {
        dateTime = 'Today';
    } else {
        if (today.getDate() < parseInt(date.toDateString().substring(8,10)) &&
            today.getDate()+7 > parseInt(date.toDateString().substring(8,10))) {
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
event: 'painted'},
{
    fn: function(element, eOpts) {
        //Replace with real resize code
    },
    event: 'resize'
}]
        }]
    },

    initialize: function() {
        var me = this,
            canvas = me.items.items[0];

        canvas.yScrollPosition = 0;
        me.callParent();

        canvas.element.on({
            tap: function(e){
                me.onTap(e,canvas);
            }
        });
        
        me.getScrollable().getScroller().on({
            scrollend: function(e){
                me.onScroll(e,canvas);
            },
            scope: me.getScrollable().getScroller()
        });

        setTimeout(me.reloadData,900000,me);
    },

    onTap: function(e,canvas) {
        if ((e.pageY + canvas.yScrollPosition) <= 80) {
            if (e.pageX >= (Ext.getBody().getSize().width*(2/3))) {
                var form = new Docket.view.formPanel();
                Ext.Viewport.add(form);
            }
        }
    },
    
    onScroll: function(e,canvas) {
        canvas.yScrollPosition = e.position.y;
    },

    reloadData: function(me) {
var today = new Date(),
    nextYear = new Date(),
    calendarId = me.calendarId,
    child = me.items.items[0];
        
    console.log(me);
    
    setTimeout(me.reloadData, 900000, me);

var token = Docket.app.authToken,
    clientId = '464168127252.apps.googleusercontent.com',
    apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
    scopes = 'https://www.googleapis.com/auth/calendar';

nextYear.setFullYear(today.getFullYear());
nextYear = nextYear.toISOString();

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
                'maxResults': 70,
                'timeMax': nextYear
            });

            request.execute(function(resp) {
                console.log(resp);
                console.log(resp.items);
                if (Ext.isDefined(resp) && Ext.isDefined(resp.items) && Ext.isDefined(resp.items[0]) && Ext.isDefined(resp.items[0].summary) && Ext.isDefined(resp.items[0].summary.length)) {
                    console.log(child);
                    child.events = resp.items;
                    child.fireEvent('painted',child);
                }
            });
        });
    } else {
        window.location.reload();
    }
});

    }
});