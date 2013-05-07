/*
 * File: app/view/MyComponent3.js
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

Ext.define('Booking.view.MyComponent3', {
    extend: 'Ext.draw.Component',
    alias: 'widget.myComponent2',

    config: {
        fullscreen: true,
        itemId: 'myComponent2',
        style: 'background:#CC3333;',
        width: '200%',
        scrollable: {
            direction: 'horizontal',
            directionLock: true
        },
        listeners: [
            {
                fn: 'onMyComponentOnDragStart2',
                event: 'onDragStart'
            },
            {
                fn: 'onMyComponentOnDrag2',
                event: 'onDrag'
            },
            {
                fn: 'onMyComponentOnDragEnd2',
                event: 'onDragEnd'
            }
        ]
    },

    onMyComponentOnDragStart2: function(draw) {
        var direction = this.getDirection(),
            absDeltaX = draw.absDeltaX,
            absDeltaY = draw.absDeltaY,
            directionLock = this.getDirectionLock();

        this.isDragging = true;

        if (directionLock) {
            if (/*(direction === 'horizontal' && absDeltaX > absDeltaY) ||*/
            (direction === 'vertical' && absDeltaY > absDeltaX)) {
                draw.stopPropagation();
            } else {
                this.isDragging = false;
                return;
            }
        }
        if (this.isAnimating) {
            this.getActiveCarouselItem().getTranslatable().stopAnimation();
        }

        this.dragStartOffset = this.offset;
        this.dragDirection = 0;
    },

    onMyComponentOnDrag2: function(draw) {
        if (!this.isDragging) {
            return;
        }

        var startOffset = this.dragStartOffset,
            direction = this.getDirection(),
            delta = direction === 'horizontal' ? draw.deltaX : draw.deltaY,
            lastOffset = this.offset,
            flickStartTime = this.flickStartTime,
            dragDirection = this.dragDirection,
            now = Ext.Date.now(),
            currentActiveIndex = this.getActiveIndex(),
            maxIndex = this.getMaxItemIndex(),
            lastDragDirection = dragDirection,
            offset;

        if ((currentActiveIndex === 0 && delta > 0) || (currentActiveIndex === maxIndex && delta < 0)) {
            delta *= 0.5;
        }

        offset = startOffset + delta;

        if (offset > lastOffset) {
            dragDirection = 1;
        } else if (offset < lastOffset) {
            dragDirection = -1;
        }

        if (dragDirection !== lastDragDirection || (now - flickStartTime) > 300) {
            this.flickStartOffset = lastOffset;
            this.flickStartTime = now;
        }

        this.dragDirection = dragDirection;
        this.setOffset(offset);
    },

    onMyComponentOnDragEnd2: function(draw) {
        if (!this.isDragging) {
            return;
        }

        this.onDrag(draw);
        this.isDragging = false;

        var now = Ext.Date.now(),
            itemLength = this.itemLength,
            threshold = itemLength / 2,
            offset = this.offset,
            activeIndex = this.getActiveIndex(),
            maxIndex = this.getMaxItemIndex(),
            animationDirection = 0,
            flickDistance = offset - this.flickStartOffset,
            flickDuration = now - this.flickStartTime,
            indicator = this.getIndicator(),
            velocity;

        if (flickDuration > 0 && Math.abs(flickDistance) >= 10) {
            velocity = flickDistance / flickDuration;
            if (Math.abs(velocity) >= 1) {
                if (velocity < 0 && activeIndex < maxIndex) {
                    animationDirection = -1;
                } else if (velocity > 0 && activeIndex > 0) {
                    animationDirection = 1;
                }
            }
        }

        if (animationDirection === 0) {
            if (activeIndex < maxIndex && offset < -threshold) {
                animationDirection = -1;
            } else if (activeIndex > 0 && offset > threshold) {
                animationDirection = 1;
            }
        }

        if (indicator) {
            indicator.setActiveIndex(activeIndex - animationDirection);
        }

        this.animationDirection = animationDirection;
        this.setOffsetAnimated(animationDirection * itemLength);
    },

    initialize: function() {
        this.callParent();

        //Line across screen
        this.getSurface('main').add({
            type: 'rect',
            fill: '#176c93',
            height : 20,
            width: 1440,
            x: 0,
            y: 430
        }).show(true);

        this.getSurface('main').add({
            type: 'text',
            text: 'Meetings in Room A',
            font: '32px Arial',
            fill: '#FFF',
            x: 70,
            y: 50
        }).show(true);

        //Rounded rectangle example
        this.getSurface('main').add({
            type: 'rect',
            fill: '#FF3333',
            height : 130,
            width: 300,
            radius: 10,
            x: 100,
            y: 260
        }).show(true);

        var dynText = '10:33 pm';

        this.getSurface('main').add({
            type: 'text',
            text: dynText,
            font: '18px Arial',
            fill: '#FFF',
            x: 200,
            y: 470
        }).show(true);
    }

});