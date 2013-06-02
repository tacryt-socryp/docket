/*
 * File: app/view/myContainer.js
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

Ext.define('Conflux.view.myContainer', {
    extend: 'Ext.Container',
    alias: 'widget.myContainer',

    config: {
        itemId: 'myContainer',
        autoDestroy: false,
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        items: [
            {
                xtype: 'draw',
                events: [
                    
                ],
                itemId: 'inlineDraw',
                autoDestroy: false,
                listeners: [
                    {
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
                                surface = this.getSurface('main'),
                                today = new Date(Date.now()),
                                w = 203 * events.length,
                                description,
                                dateTime,
                                summary,
                                yloc = h/10,
                                xloc;

                            me.setSize(w,h);
                            surface.setSize(w,h);
                            surface.setBackground(backgroundColor);

                            //Line across screen
                            surface.add({
                                type: 'rect',
                                fill: timelineColor,
                                height : 20,
                                width: w,
                                x: 0,
                                y: yloc+330
                            }).show(true);

                            //Name of room
                            surface.add({
                                type: 'text',
                                text: roomText,
                                font: "40px Arial",
                                fill: '#FFF',
                                x: 35,
                                y: 70
                            }).show(true);

                            surface.add({
                                type: 'rect',
                                fill: backgroundColor,
                                height : 100,
                                width: 200,
                                x: displace,
                                y: 70
                            }).show(true);

                            var addText = surface.add({
                                type: 'text',
                                text: '+add',
                                font: "36px Arial",
                                fill: '#FFF',
                                x: displace,
                                y: 70
                            }).show(true);

                            for (var iter = 0; iter < events.length; iter++) {
                                xloc = iter*200;
                                summary = events[iter].summary;
                                try {
                                    if (summary.length > 26) {
                                        summary = summary.substring(0,24) + '...';
                                    }
                                } catch(e) {
                                    console.log(summary);
                                }

                                description = events[iter].description;
                                try {
                                    description = description.replace(/\n/g, ' ');
                                    if (description.length > 35) {
                                        if (description.length > 70) {
                                            description = description.substring(0,35) + '\n' + description.substring(35,70) + '...';
                                        } else {
                                            description = description.substring(0,35) + '\n' + description.substring(35);
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

                                //Larger Point on timeline
                                surface.add({
                                    type: 'circle',
                                    cx: xloc+192,
                                    cy: yloc+338,
                                    r: 22,
                                    fillStyle: dotColor
                                }).show(true);

                                surface.add({
                                    type: 'circle',
                                    cx: xloc+192,
                                    cy: yloc+338,
                                    r: 16,
                                    fillStyle: boxColor
                                }).show(true);

                                if (iter % 2 === 0) {
                                    surface.add({
                                        type: 'rect',
                                        fill: boxColor,
                                        height: 160,
                                        width: 300,
                                        radius: 10,
                                        x: xloc+38,
                                        y: yloc+110
                                    }).show(true);

                                    surface.add({
                                        type: 'path',
                                        path: 'M ' + (xloc+178) + ' ' + (yloc+270) + ' ' +
                                        'l ' + 25 + ' ' + 0 + ' ' +
                                        'l ' + -12 + ' ' + 10 + 'z',
                                        fillStyle: boxColor
                                    }).show(true);

                                    surface.add({
                                        type: 'text',
                                        text: summary,
                                        font: '22px Arial',
                                        width: 290,
                                        height: 130,
                                        fill: '#FFF',
                                        x: xloc+48,
                                        y: yloc+135
                                    }).show(true);

                                    if (description !== false) {
                                        surface.add({
                                            type: 'text',
                                            text: description,
                                            font: '16px Times New Roman',
                                            width: 280,
                                            height: 100,
                                            fill: '#FFF',
                                            x: xloc+48,
                                            y: yloc+190
                                        }).show(true);
                                    }

                                    //Time and date for top
                                    surface.add({
                                        type: 'text',
                                        text: dateTime,
                                        font: '14px Arial',
                                        fill: '#FFF',
                                        x: xloc+165,
                                        y: yloc+380
                                    }).show(true);

                                } else {

                                    surface.add({
                                        type: 'rect',
                                        fill: boxColor,
                                        height : 160,
                                        width: 300,
                                        radius: 10,
                                        x: xloc+38,
                                        y: yloc+410
                                    }).show(true);

                                    surface.add({
                                        type: 'path',
                                        path: 'M ' + (xloc+203) + ' ' + (yloc+410) + ' ' +
                                        'l ' + -25 + ' ' + 0 + ' ' +
                                        'l ' + 12 + ' ' + -10 + 'z',
                                        fillStyle: boxColor
                                    }).show(true);

                                    surface.add({
                                        type: 'text',
                                        text: summary,
                                        width: 290,
                                        height: 130,
                                        font: '22px Arial',
                                        fill: '#FFF',
                                        x: xloc+48,
                                        y: yloc+435
                                    }).show(true);

                                    if (description !== false) {
                                        surface.add({
                                            type: 'text',
                                            text: description,
                                            font: '16px Times New Roman',
                                            width: 280,
                                            height: 100,
                                            fill: '#FFF',
                                            x: xloc+48,
                                            y: yloc+485
                                        }).show(true);
                                    }

                                    //Time and date for bottom
                                    surface.add({
                                        type: 'text',
                                        text: dateTime,
                                        font: '14px Arial',
                                        fill: '#FFF',
                                        x: xloc+165,
                                        y: yloc+308
                                    }).show(true);
                                }
                            }
                        },
                        event: 'painted'
                    },
                    {
                        fn: function(element, eOpts) {
                            this.setSize(null, Ext.getBody().getSize().height);
                            this.getSurface('main').setSize(null, Ext.getBody().getSize().height);
                        },
                        event: 'resize'
                    }
                ]
            }
        ]
    },

    initialize: function() {
        this.callParent();

        this.element.on({
            tap: this.onTap
        });
    },

    onTap: function(e) {
        console.log(this);
        console.log(this.child);
        if (e.pageY <= 70) {
            if (e.pageX >= Ext.getBody().getSize().width-200) {
                var form = new Conflux.view.MyFormPanel();
                //form.roomText = this.down('#inlineDraw').roomText;
                //form.calendarId = this.down('#inlineDraw').calendarId;
                Ext.Viewport.add(form);
            }
        }
    }

});