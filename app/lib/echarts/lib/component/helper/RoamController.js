/**
 * @module echarts/component/helper/RoamController
 */



    var Eventful = require('zrender/lib/mixin/Eventful');
    var zrUtil = require('zrender/lib/core/util');
    var eventTool = require('zrender/lib/core/event');
    var interactionMutex = require('./interactionMutex');

    function mousedown(e) {
        if (e.target && e.target.draggable) {
            return;
        }

        var x = e.offsetX;
        var y = e.offsetY;

        if (this.containsPoint && this.containsPoint(x, y)) {
            this._x = x;
            this._y = y;
            this._dragging = true;
        }
    }

    function mousemove(e) {
        if (!this._dragging) {
            return;
        }

        eventTool.stop(e.event);

        if (e.gestureEvent !== 'pinch') {

            if (interactionMutex.isTaken(this._zr, 'globalPan')) {
                return;
            }

            var x = e.offsetX;
            var y = e.offsetY;

            var oldX = this._x;
            var oldY = this._y;

            var dx = x - oldX;
            var dy = y - oldY;

            this._x = x;
            this._y = y;

            var target = this.target;

            if (target) {
                var pos = target.position;
                pos[0] += dx;
                pos[1] += dy;
                target.dirty();
            }

            eventTool.stop(e.event);
            this.trigger('pan', dx, dy, oldX, oldY, x, y);
        }
    }

    function mouseup(e) {
        this._dragging = false;
    }

    function mousewheel(e) {
        // wheelDelta maybe -0 in chrome mac.
        if (e.wheelDelta === 0) {
            return;
        }
        // Convenience:
        // Mac and VM Windows on Mac: scroll up: zoom out.
        // Windows: scroll up: zoom in.
        var zoomDelta = e.wheelDelta > 0 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.offsetX, e.offsetY);
    }

    function pinch(e) {
        if (interactionMutex.isTaken(this._zr, 'globalPan')) {
            return;
        }
        var zoomDelta = e.pinchScale > 1 ? 1.1 : 1 / 1.1;
        zoom.call(this, e, zoomDelta, e.pinchX, e.pinchY);
    }

    function zoom(e, zoomDelta, zoomX, zoomY) {
        if (this.containsPoint && this.containsPoint(zoomX, zoomY)) {
            // When mouse is out of roamController rect,
            // default befavoius should be be disabled, otherwise
            // page sliding is disabled, contrary to expectation.
            eventTool.stop(e.event);

            var target = this.target;
            var zoomLimit = this.zoomLimit;

            if (target) {
                var pos = target.position;
                var scale = target.scale;

                var newZoom = this.zoom = this.zoom || 1;
                newZoom *= zoomDelta;
                if (zoomLimit) {
                    var zoomMin = zoomLimit.min || 0;
                    var zoomMax = zoomLimit.max || Infinity;
                    newZoom = Math.max(
                        Math.min(zoomMax, newZoom),
                        zoomMin
                    );
                }
                var zoomScale = newZoom / this.zoom;
                this.zoom = newZoom;
                // Keep the mouse center when scaling
                pos[0] -= (zoomX - pos[0]) * (zoomScale - 1);
                pos[1] -= (zoomY - pos[1]) * (zoomScale - 1);
                scale[0] *= zoomScale;
                scale[1] *= zoomScale;

                target.dirty();
            }

            this.trigger('zoom', zoomDelta, zoomX, zoomY);
        }
    }

    /**
     * @alias module:echarts/component/helper/RoamController
     * @constructor
     * @mixin {module:zrender/mixin/Eventful}
     *
     * @param {module:zrender/zrender~ZRender} zr
     * @param {module:zrender/Element} target
     */
    function RoamController(zr, target) {

        /**
         * @type {module:zrender/Element}
         */
        this.target = target;

        /**
         * @type {Function}
         */
        this.containsPoint;

        /**
         * { min: 1, max: 2 }
         * @type {Object}
         */
        this.zoomLimit;

        /**
         * @type {number}
         */
        this.zoom;
        /**
         * @type {module:zrender}
         */
        this._zr = zr;

        // Avoid two roamController bind the same handler
        var bind = zrUtil.bind;
        var mousedownHandler = bind(mousedown, this);
        var mousemoveHandler = bind(mousemove, this);
        var mouseupHandler = bind(mouseup, this);
        var mousewheelHandler = bind(mousewheel, this);
        var pinchHandler = bind(pinch, this);

        Eventful.call(this);

        /**
         * @param {Function} containsPoint
         *                   input: x, y
         *                   output: boolean
         */
        this.setContainsPoint = function (containsPoint) {
            this.containsPoint = containsPoint;
        };

        /**
         * Notice: only enable needed types. For example, if 'zoom'
         * is not needed, 'zoom' should not be enabled, otherwise
         * default mousewheel behaviour (scroll page) will be disabled.
         *
         * @param  {boolean|string} [controlType=true] Specify the control type,
         *                          which can be null/undefined or true/false
         *                          or 'pan/move' or 'zoom'/'scale'
         */
        this.enable = function (controlType) {
            // Disable previous first
            this.disable();

            if (controlType == null) {
                controlType = true;
            }

            if (controlType === true || (controlType === 'move' || controlType === 'pan')) {
                zr.on('mousedown', mousedownHandler);
                zr.on('mousemove', mousemoveHandler);
                zr.on('mouseup', mouseupHandler);
            }
            if (controlType === true || (controlType === 'scale' || controlType === 'zoom')) {
                zr.on('mousewheel', mousewheelHandler);
                zr.on('pinch', pinchHandler);
            }
        };

        this.disable = function () {
            zr.off('mousedown', mousedownHandler);
            zr.off('mousemove', mousemoveHandler);
            zr.off('mouseup', mouseupHandler);
            zr.off('mousewheel', mousewheelHandler);
            zr.off('pinch', pinchHandler);
        };

        this.dispose = this.disable;

        this.isDragging = function () {
            return this._dragging;
        };

        this.isPinching = function () {
            return this._pinching;
        };
    }

    zrUtil.mixin(RoamController, Eventful);

    module.exports = RoamController;
