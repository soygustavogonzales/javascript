(function() {
  var Slider, lastTime, slider, vendor, vendors, _i, _len,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Slider = (function() {
    Slider.prototype.raf = null;

    Slider.prototype.mdown = false;

    Slider.prototype.mPos = {
      x: 0,
      y: 0
    };

    Slider.prototype.elementPosition = {
      x: 0,
      y: 0
    };

    Slider.prototype.radius = 146;

    Slider.prototype.knobRadius = 15;

    Slider.prototype.maxDiff = 150;

    Slider.prototype.constraint = 360;

    Slider.prototype.target = 0;

    Slider.prototype.centerX = 0;

    Slider.prototype.centerY = 0;

    Slider.prototype.$circle = null;

    Slider.prototype.$knob = null;

    Slider.prototype.$progress = null;

    Slider.prototype.x = 0;

    Slider.prototype.y = 0;

    function Slider($context) {
      var bg, circleOffset;
      this.$context = $context;
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onMouseUp = __bind(this.onMouseUp, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.updateSlider = __bind(this.updateSlider, this);
      this.$circle = this.$context.find(".circle");
      this.$innerCircle = this.$context.find(".inner-circle");
      this.$knob = this.$context.find(".knob");
      this.$progress = this.$context.find(".progress");
      this.ctx = this.$progress.get(0).getContext("2d");
      circleOffset = this.$circle.offset();
      this.elementPosition = {
        x: circleOffset.left,
        y: circleOffset.top
      };
      this.centerX = this.$progress.width() / 2;
      this.centerY = this.$progress.height() / 2;
      this.canvasSize = this.$progress.width();
      bg = this.getBackground();
      this.$context.css({
        backgroundImage: "url(" + bg + ")"
      });
      this.$innerCircle.css({
        backgroundImage: "url(" + bg + ")"
      });
      this.addEventListeners();
      this.updateSlider();
      return;
    }

    Slider.prototype.addEventListeners = function() {
      this.$context.on("mousedown", this.onMouseDown);
      this.$context.on("mousemove", this.onMouseMove);
      $("body").on("mouseup", this.onMouseUp);
    };

    Slider.prototype.updateSlider = function() {
      this.raf = requestAnimationFrame(this.updateSlider);
      this.setPosition();
      this.drawArc();
    };

    Slider.prototype.setPosition = function() {
      this.x = Math.round(this.radius * Math.sin(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 4;
      this.y = Math.round(this.radius * -Math.cos(this.target * Math.PI / 180)) + this.radius - this.knobRadius + 4;
      this.$knob.css({
        left: this.x,
        top: this.y
      });
    };

    Slider.prototype.drawArc = function() {
      this.$progress.get(0).width = this.canvasSize;
      this.$progress.get(0).height = this.canvasSize;
      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY - this.radius);
      this.ctx.rotate(-90 * Math.PI / 180);
      this.ctx.strokeStyle = "#0083ad";
      this.ctx.beginPath();
      this.ctx.lineWidth = 8;
      this.ctx.arc(0 - this.radius - 1, 0, this.radius - 1, 0, this.target * Math.PI / 180, false);
      this.ctx.stroke();
      this.ctx.restore();
    };

    Slider.prototype.setMousePosition = function(event) {
      var atan, diff, target, val;
      this.mPos = {
        x: event.pageX - this.elementPosition.x,
        y: event.pageY - this.elementPosition.y
      };
      atan = Math.atan2(this.mPos.x - this.radius, this.mPos.y - this.radius);
      target = -atan / (Math.PI / 180) + 180;
      diff = Math.abs(target - this.target);
      if (diff < this.maxDiff && target < this.constraint) {
        this.target = target;
        val = {
          type: "sliderchange",
          value: this.target
        };
        this.$context.trigger(val);
      }
    };

    Slider.prototype.getBackground = function() {
      var dividerEvery, i, img, steps, _i;
      steps = 60;
      dividerEvery = 15;
      this.$progress.get(0).height = this.canvasSize;
      this.$progress.get(0).width = this.canvasSize;
      this.ctx.save();
      this.ctx.translate(this.centerX, this.centerY);
      for (i = _i = 0; _i <= steps; i = _i += 1) {
        this.ctx.beginPath();
        this.ctx.rotate(Math.PI * 2 / steps);
        if (i % dividerEvery === dividerEvery - 1) {
          this.ctx.lineWidth = 2;
          this.ctx.moveTo(160, 0);
          this.ctx.lineTo(136, 0);
          this.ctx.strokeStyle = "#04465C";
        } else {
          this.ctx.lineWidth = 1;
          this.ctx.lineTo(155, 0);
          this.ctx.lineTo(135, 0);
          this.ctx.strokeStyle = "#02394A";
        }
        this.ctx.stroke();
      }
      this.ctx.restore();
      img = this.$progress.get(0).toDataURL();
      this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
      return img;
    };

    Slider.prototype.onMouseDown = function(event) {
      this.mdown = true;
    };

    Slider.prototype.onMouseUp = function(event) {
      this.mdown = false;
    };

    Slider.prototype.onMouseMove = function(event) {
      if (this.mdown) {
        this.setMousePosition(event);
      }
    };

    return Slider;

  })();

  this.$slider = $(".radial-slider");

  this.$value = $(".value");

  slider = new Slider(this.$slider);

  $slider.on("sliderchange", (function(_this) {
    return function(event) {
      console.log(event.value);
      _this.$value.html(Math.round(event.value));
    };
  })(this));

  lastTime = 0;

  vendors = ['ms', 'moz', 'webkit', 'o'];

  this.cancelAnimationFrame || (this.cancelAnimationFrame = this.cancelRequestAnimationFrame);

  if (!this.requestAnimationFrame) {
    for (_i = 0, _len = vendors.length; _i < _len; _i++) {
      vendor = vendors[_i];
      this.requestAnimationFrame || (this.requestAnimationFrame = this[vendor + 'RequestAnimationFrame']);
      this.cancelAnimationFrame = this.cancelRequestAnimationFrame || (this.cancelRequestAnimationFrame = this[vendor + 'CancelRequestAnimationFrame']);
    }
  }

  if (!this.requestAnimationFrame) {
    this.requestAnimationFrame = function(callback, element) {
      var currTime, id, timeToCall;
      currTime = new Date().getTime();
      timeToCall = Math.max(0, 16 - (currTime - lastTime));
      id = this.setTimeout((function() {
        return callback(currTime + timeToCall);
      }), timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!this.cancelAnimationFrame) {
    this.cancelAnimationFrame = this.cancelRequestAnimationFrame = function(id) {
      return clearTimeout(id);
    };
  }

}).call(this);
