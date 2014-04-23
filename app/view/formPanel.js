Ext.define('Docket.view.formPanel', {
    extend: 'Ext.form.Panel',

    requires: [
        'Docket.view.timeSlider',
        'Ext.field.TextArea',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.Button',
        'Ext.field.Slider',
        'Ext.Label',
        'Ext.Toolbar'
    ],

    config: {
        centered: true,
        height: '90%',
        id: 'formPanel',
        submitted: false,
        itemId: 'formPanel',
        width: '90%',
        hideOnMaskTap: true,
        modal: true,
        hideAnimation: {
            type: 'fadeOut',
            duration: 100
        },
        showAnimation: {
            type: 'fadeIn',
            duration: 100
        },
    items: [{
            xtype: 'textfield',
            cls: 'eventTitle',
            itemId: 'eventTitle',
            placeHolder: 'Summary'
        },
        {
            xtype: 'textareafield',
            cls: 'eventDescription',
            itemId: 'eventDescription',
            placeHolder: 'Description',
            autoCapitalize: true
        },
        {
            xtype: 'datepickerfield',
            itemId: 'datepicker',
            placeHolder: 'Date: ',
            picker: {
                itemId: 'picker'
            }
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [{
            xtype: 'container',
            width: '75%',
            items: [{
                    xtype: 'timeSlider',
                    listeners: {
                        change: function(f) {
                            var hours = f.getValue() / 2;
                            var minutes = (hours - parseInt(hours, 10)) * 60;
                            var ampm = ' am';
                            hours = parseInt(hours, 10);
                            if (hours == 24) {
                                hours = 11;
                                minutes = 59;
                                ampm = ' pm';
                            } else if (hours > 12) {
                                hours = hours - 12;
                                ampm = ' pm';
                            } else if (hours == 12) {
                                ampm = ' pm';
                            }

                            if (hours < 10) {
                                hours = '0' + hours;
                            }

                            if (minutes === 0) {
                                minutes = '00';
                            }

                            var startLabel = document.getElementsByClassName('startLabel')[0];
                            startLabel.innerText = hours + ':' + minutes + ampm;

                        }
                    },
                    label: '',
                    labelWidth: 0
                }
            ]
        },
        {
            xtype: 'label',
            cls: 'startLabel',
            html: '12:00 am',
            itemId: 'startLabel',
            padding: '20 0 0 0',
            style: 'background:#FFF; color: #555; font-size:90%;',
            width: '25%'
        }
    ]
},
{
    xtype: 'container',
    layout: 'hbox',
    items: [{
        xtype: 'container',
        width: '75%',
        items: [{
            xtype: 'timeSlider',
            listeners: {
change: function(f) {
    var hours = f.getValue() / 2;
    var minutes = (hours - parseInt(hours, 10)) * 60;
    var ampm = ' am';
    hours = parseInt(hours, 10);
    if (hours == 24) {
        hours = 11;
        minutes = 59;
        ampm = ' pm';
    } else if (hours > 12) {
        hours = hours - 12;
        ampm = ' pm';
    } else if (hours == 12) {
        ampm = ' pm';
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes === 0) {
        minutes = '00';
    }

    var endLabel = document.getElementsByClassName('endLabel')[0];
    endLabel.innerText = hours + ':' + minutes + ampm;

}
            },
            label: '',
            labelWidth: 0
        }]
    },
        {
            xtype: 'label',
            cls: 'endLabel',
            html: '12:00 am',
            itemId: 'endLabel',
            padding: '20 0 0 0',
            style: 'background:#FFF; color: #555; font-size:90%;',
            width: '25%'
        }
    ]},
    {
        xtype: 'textareafield',
        cls: 'eventGuest',
        placeHolder: 'Guests',
        listeners:{
            focus: function(e){
                var cmp = Ext.getCmp('formPanel');
                window.setTimeout(function(){
                    cmp.getScrollable().getScroller().scrollToEnd();
                },800);
                
            }
        }
    },
    {
        xtype: 'toolbar',
        docked: 'bottom',
        width: '100%',
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
        {
            xtype: 'button',
            ui: 'confirm',
            width: '40%',
            text: 'Cancel',
            handler: function(button, event) {
                var me = this,
                    formPanel = me.getParent().getParent();
                formPanel.hide();
            }
        },
        {
            xtype: 'button',
handler: function(button, event) {
    var me = this,
    summary = document.getElementsByClassName('x-input-text')[0].value,
    description = document.getElementsByClassName('x-input-text')[1].value,
    guests = document.getElementsByClassName('x-input-text')[3].value,
    start = document.getElementsByClassName('startLabel')[0].innerHTML,
    end = document.getElementsByClassName('endLabel')[0].innerHTML,
    mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0],
    myContainer = mainCarousel.getActiveItem(),
    calendarId = myContainer.calendarId,
    roomText = myContainer.roomText,
    dateStart = new Date(),
    dateEnd = new Date(),
    attendee = '',
    date;
    
    me.disable();

var token = Docket.app.authToken,
    clientId = '464168127252.apps.googleusercontent.com',
    apiKey = 'AIzaSyAy7JAsd5JlzjTR_fkkarby9N1c3YkhY6o',
    scopes = 'https://www.googleapis.com/auth/calendar';

function returnTimestamp(date) {
    var hours = date.getHours(),
        minutes = date.getMinutes(),
        months = date.getMonth() + 1,
        days = date.getDate(),
        timezone = ((date.getTimezoneOffset()/60)*-1);

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (months < 10) {
        months = '0' + months;
    }

    if (days < 10) {
        days = '0' + days;
    }

    if (timezone > 0) {
        timezone = '+' + timezone;
    }

    if ((timezone < 10) || (timezone > -10)) {
        timezone = timezone.toString();
        timezone = timezone.substring(0,1) + '0' + timezone.substring(1);
    }

    return(date.getFullYear() + '-' + months + '-' + days + 'T' + hours + ':' + minutes + ':00.000' + timezone + ':00');
}

try {
    date = Ext.ComponentQuery.query('#picker')[0].getValue();
} catch(e) {
    date = new Date();
}

dateStart.setDate(date.getDate());
dateStart.setMonth(date.getMonth());
dateStart.setFullYear(date.getFullYear());

hours = parseInt(start.substring(0,2),10);
minutes = parseInt(start.substring(3,5),10);
        
if (hours.toString() == "NaN") {
    hours = 0;
}

if (minutes.toString() == "NaN") {
    minutes = 0;
}


if ((start.substring(6,8) == 'pm') && (hours != 12)) {
    hours = hours + 12;
}

dateStart.setHours(hours);
dateStart.setMinutes(minutes);
dateStart.setSeconds(0);


dateEnd.setDate(date.getDate());
dateEnd.setMonth(date.getMonth());
dateEnd.setFullYear(date.getFullYear());

hours = parseInt(end.substring(0,2),10);
minutes = parseInt(end.substring(3,5),10);
   
if (hours.toString() == "NaN") {
    hours = 0;
}

if (minutes.toString() == "NaN") {
    minutes = 0;
}

if ((end.substring(6,8) == 'pm') && (hours != 12)) {
    hours = hours + 12;
}

dateEnd.setHours(hours);
dateEnd.setMinutes(minutes);
dateEnd.setSeconds(0);

start = returnTimestamp(dateStart);
end = returnTimestamp(dateEnd);

var resource = {
    'summary': summary,
    'description': description,
    'location': roomText,
    'start': {
        'dateTime': start
    },
    'end': {
        'dateTime': end
    },
    'attendees': [
//    {
//        'email': calendarId,
//        'displayName': roomText,
//        'responseStatus': 'needsAction'
//    }
    ]
};

guests = guests.replace(/(\r\n|\n|\r)/gm,'');
guests = guests.replace(/\s+/g, '');
guests = guests.split(',');
for (var i=0; i<guests.length; i++) {
    attendee = guests[i];
    if (attendee !== '') {
        attendee = attendee.split('@');
        if (attendee.length > 1) {
            resource.attendees.push({
                'email': attendee[0] + '@' + attendee[1],
                'displayName': attendee[0],
                'responseStatus': 'needsAction'
            });
        }
    }
}

try {
    gapi.client.setApiKey(apiKey);
    gapi.auth.setToken(token);
} catch(e) {
    window.location.reload();
}

gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, function(authResult) {
    if (authResult) {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.insert({
                'calendarId': calendarId,
                'resource': resource
            });
            request.execute(function(resp) {
                if (resp.id) {
                    var mainCarousel = Ext.ComponentQuery.query('#mainCarousel')[0],
                        myContainer = mainCarousel.getActiveItem();
                    me.getParent().getParent().hide();
                    setTimeout(function() {
                        myContainer.reloadRequest.call(myContainer);
                    }, 2500);
                } else {
                    alert('There was an error while adding your event.');
                }
            });
        });
    }
});
    },
    ui: 'confirm',
    width: '40%',
    text: 'Add'
}]
    }],
    listeners: [{
        fn: 'onFormPanelHide',
        event: 'hide'
    }]
},

    onFormPanelHide: function(component, eOpts) {
        window.setTimeout(function() {component.destroy();}, 2500);
    },

    initialize: function() {
        this.callParent();

        this.down('#datepicker').setValue(new Date());
    }

});