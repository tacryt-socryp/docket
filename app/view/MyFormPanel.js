/*
 * File: app/view/MyFormPanel.js
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

Ext.define('Conflux.view.MyFormPanel', {
    extend: 'Ext.form.Panel',

    requires: [
        'Conflux.view.timeSlider'
    ],

    config: {
        calendarId: 'calendar',
        roomText: 'room',
        centered: true,
        height: 387,
        itemId: 'MyFormPanel',
        width: 600,
        hideOnMaskTap: true,
        modal: true,
        items: [
            {
                xtype: 'textfield',
                cls: 'eventTitle',
                itemId: 'eventTitle',
                label: 'Summary: ',
                required: true
            },
            {
                xtype: 'textareafield',
                cls: 'eventDescription',
                itemId: 'eventDescription',
                label: 'Description: ',
                autoCapitalize: true
            },
            {
                xtype: 'datepickerfield',
                itemId: 'datepicker',
                label: 'Date: ',
                required: true,
                picker: {
                    itemId: 'picker'
                }
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'container',
                        width: 515,
                        items: [
                            {
                                xtype: 'timeSlider',
                                listeners: {
                                    change: function(f) {
                                        var hours = f.getValue() / 2;
                                        var minutes = (hours - parseInt(hours, 10)) * 60;
                                        var ampm = ' am';
                                        hours = parseInt(hours, 10);
                                        if (hours > 12) {
                                            hours = hours - 12;
                                            ampm = ' pm';
                                        } else if (hours == 12) {
                                            ampm = ' pm';
                                        }
                                        
                                        if (hours < 10) {
                                            hours = '0' + hours.toString();
                                        }
                                        
                                        if (minutes === 0) {
                                            minutes = '00';
                                        }
                                        
                                        var startLabel = document.getElementsByClassName('startLabel')[0];
                                        startLabel.innerText = hours + ':' + minutes + ampm;
                                        
                                    }
                                },
                                label: 'Start:'
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'startLabel',
                        html: '12:00 am',
                        itemId: 'startLabel',
                        padding: '20 0 0 0',
                        style: 'background:#FFF;font-size:90%;',
                        width: 80
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'container',
                        width: 515,
                        items: [
                            {
                                xtype: 'timeSlider',
                                listeners: {
                                    change: function(f) {
                                        var hours = f.getValue() / 2;
                                        var minutes = (hours - parseInt(hours, 10)) * 60;
                                        var ampm = ' am';
                                        hours = parseInt(hours, 10);
                                        if (hours > 12) {
                                            hours = hours - 12;
                                            ampm = ' pm';
                                        } else if (hours == 12) {
                                            ampm = ' pm';
                                        }
                                        
                                        if (minutes === 0) {
                                            minutes = '00';
                                        }
                                        
                                        var endLabel = document.getElementsByClassName('endLabel')[0];
                                        endLabel.innerText = hours + ':' + minutes + ampm;
                                        
                                    }
                                },
                                label: 'End: '
                            }
                        ]
                    },
                    {
                        xtype: 'label',
                        cls: 'endLabel',
                        html: '12:00 am',
                        itemId: 'endLabel',
                        padding: '20 0 0 0',
                        style: 'background:#FFF; font-size:90%;',
                        width: 80
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        handler: function(button, event) {
                            var summary = document.getElementsByClassName('x-form-field')[0].value,
                                description = document.getElementsByClassName('x-form-field')[1].value,
                                start = document.getElementsByClassName('startLabel')[0].innerHTML,
                                end = document.getElementsByClassName('endLabel')[0].innerHTML,
                                formPanel = Ext.ComponentQuery.query('#MyFormPanel')[0],
                                calendarId = formPanel.getCalendarId(),
                                roomText = formPanel.getRoomText(),
                                dateStart = new Date(),
                                dateEnd = new Date(),
                                date;

                            console.log(formPanel);
                            console.log(roomText);

                            function returnTimestamp(date) {
                                var hours = date.getHours(),
                                    minutes = date.getMinutes(),
                                    months = date.getMonth(),
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

                            dateEnd.setDate(date.getDate());
                            dateEnd.setMonth(date.getMonth());
                            dateEnd.setFullYear(date.getFullYear());

                            hours = parseInt(start.substring(0,2),10);
                            minutes = parseInt(start.substring(3,5),10);

                            if ((start.substring(5,7) == 'pm') && (hours != 12)) {
                                hours = hours + 12;
                            }

                            dateStart.setHours(hours);
                            dateStart.setMinutes(minutes);
                            dateStart.setSeconds(0);

                            hours = parseInt(end.substring(0,2),10);
                            minutes = parseInt(end.substring(3,5),10);

                            if ((end.substring(5,7) == 'pm') && (hours != 12)) {
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
                                }
                            };

                            console.log(resource);

                            /*
                            var request = gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': resource
                            });

                            request.execute(function(resp) {
                            console.log(resp);
                            });
                            */
                        },
                        ui: 'confirm',
                        width: '120px',
                        text: 'Submit'
                    }
                ]
            }
        ]
    },

    initialize: function() {
        this.callParent();

        this.down('#datepicker').setValue(new Date());
    },

    addEvent: function(calendarId, roomText) {
        var resource = {
            "summary": "Appointment",
            "location": "Somewhere",
            "start": {
                "dateTime": "2011-12-16T10:00:00.000-07:00"
            },
            "end": {
                "dateTime": "2011-12-16T10:25:00.000-07:00"
            }
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': resource
        });

        request.execute(function(resp) {
            console.log(resp);
        });
    }

});