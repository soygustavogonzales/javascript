    var __slice=[].slice,__indexOf=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};(function(e,t){var n;return n=function(){function t(t,n){var r,i=this;this.input=t,this.defaultOptions={animate:!0,snapMid:!1,classPrefix:null,classSuffix:null,theme:null,highlight:!1},this.settings=e.extend({},this.defaultOptions,n),this.settings.theme&&(this.settings.classSuffix="-"+this.settings.theme),this.input.hide(),this.slider=e("<div>").addClass("slider"+(this.settings.classSuffix||"")).css({position:"relative",userSelect:"none",boxSizing:"border-box"}).insertBefore(this.input),this.input.attr("id")&&this.slider.attr("id",this.input.attr("id")+"-slider"),this.track=this.createDivElement("track").css({width:"100%"}),this.settings.highlight&&(this.highlightTrack=this.createDivElement("highlight-track").css({width:"0"})),this.dragger=this.createDivElement("dragger"),this.slider.css({minHeight:this.dragger.outerHeight(),marginLeft:this.dragger.outerWidth()/2,marginRight:this.dragger.outerWidth()/2}),this.track.css({marginTop:this.track.outerHeight()/-2}),this.settings.highlight&&this.highlightTrack.css({marginTop:this.track.outerHeight()/-2}),this.dragger.css({marginTop:this.dragger.outerWidth()/-2,marginLeft:this.dragger.outerWidth()/-2}),this.track.mousedown(function(e){return i.trackEvent(e)}),this.settings.highlight&&this.highlightTrack.mousedown(function(e){return i.trackEvent(e)}),this.dragger.mousedown(function(e){if(e.which!==1)return;return i.dragging=!0,i.dragger.addClass("dragging"),i.domDrag(e.pageX,e.pageY),!1}),e("body").mousemove(function(t){if(i.dragging)return i.domDrag(t.pageX,t.pageY),e("body").css({cursor:"pointer"})}).mouseup(function(t){if(i.dragging)return i.dragging=!1,i.dragger.removeClass("dragging"),e("body").css({cursor:"auto"})}),this.pagePos=0,this.input.val()===""?(this.value=this.getRange().min,this.input.val(this.value)):this.value=this.nearestValidValue(this.input.val()),this.setSliderPositionFromValue(this.value),r=this.valueToRatio(this.value),this.input.trigger("slider:ready",{value:this.value,ratio:r,position:r*this.slider.outerWidth(),el:this.slider})}return t.prototype.createDivElement=function(t){var n;return n=e("<div>").addClass(t).css({position:"absolute",top:"50%",userSelect:"none",cursor:"pointer"}).appendTo(this.slider),n},t.prototype.setRatio=function(e){var t;return e=Math.min(1,e),e=Math.max(0,e),t=this.ratioToValue(e),this.setSliderPositionFromValue(t),this.valueChanged(t,e,"setRatio")},t.prototype.setValue=function(e){var t;return e=this.nearestValidValue(e),t=this.valueToRatio(e),this.setSliderPositionFromValue(e),this.valueChanged(e,t,"setValue")},t.prototype.trackEvent=function(e){if(e.which!==1)return;return this.domDrag(e.pageX,e.pageY,!0),this.dragging=!0,!1},t.prototype.domDrag=function(e,t,n){var r,i,s;n==null&&(n=!1),r=e-this.slider.offset().left,r=Math.min(this.slider.outerWidth(),r),r=Math.max(0,r);if(this.pagePos!==r)return this.pagePos=r,i=r/this.slider.outerWidth(),s=this.ratioToValue(i),this.valueChanged(s,i,"domDrag"),this.settings.snap?this.setSliderPositionFromValue(s,n):this.setSliderPosition(r,n)},t.prototype.setSliderPosition=function(e,t){t==null&&(t=!1);if(t&&this.settings.animate){this.dragger.animate({left:e},200);if(this.settings.highlight)return this.highlightTrack.animate({width:e},200)}else{this.dragger.css({left:e});if(this.settings.highlight)return this.highlightTrack.css({width:e})}},t.prototype.setSliderPositionFromValue=function(e,t){var n;return t==null&&(t=!1),n=this.valueToRatio(e),this.setSliderPosition(n*this.slider.outerWidth(),t)},t.prototype.getRange=function(){return this.settings.allowedValues?{min:Math.min.apply(Math,this.settings.allowedValues),max:Math.max.apply(Math,this.settings.allowedValues)}:this.settings.range?{min:parseFloat(this.settings.range[0]),max:parseFloat(this.settings.range[1])}:{min:0,max:1}},t.prototype.nearestValidValue=function(t){var n,r,i,s;return i=this.getRange(),t=Math.min(i.max,t),t=Math.max(i.min,t),this.settings.allowedValues?(n=null,e.each(this.settings.allowedValues,function(){if(n===null||Math.abs(this-t)<Math.abs(n-t))return n=this}),n):this.settings.step?(r=(i.max-i.min)/this.settings.step,s=Math.floor((t-i.min)/this.settings.step),(t-i.min)%this.settings.step>this.settings.step/2&&s<r&&(s+=1),s*this.settings.step+i.min):t},t.prototype.valueToRatio=function(e){var t,n,r,i,s,o,u,a;if(this.settings.equalSteps){a=this.settings.allowedValues;for(i=o=0,u=a.length;o<u;i=++o){t=a[i];if(typeof n=="undefined"||n===null||Math.abs(t-e)<Math.abs(n-e))n=t,r=i}return this.settings.snapMid?(r+.5)/this.settings.allowedValues.length:r/(this.settings.allowedValues.length-1)}return s=this.getRange(),(e-s.min)/(s.max-s.min)},t.prototype.ratioToValue=function(e){var t,n,r,i,s;return this.settings.equalSteps?(s=this.settings.allowedValues.length,i=Math.round(e*s-.5),t=Math.min(i,this.settings.allowedValues.length-1),this.settings.allowedValues[t]):(n=this.getRange(),r=e*(n.max-n.min)+n.min,this.nearestValidValue(r))},t.prototype.valueChanged=function(t,n,r){var i;if(t.toString()===this.value.toString())return;return this.value=t,i={value:t,ratio:n,position:n*this.slider.outerWidth(),trigger:r,el:this.slider},this.input.val(t).trigger(e.Event("change",i)).trigger("slider:changed",i)},t}(),e.extend(e.fn,{simpleSlider:function(){var t,r,i;return i=arguments[0],t=2<=arguments.length?__slice.call(arguments,1):[],r=["setRatio","setValue"],e(this).each(function(){var s,o;return i&&__indexOf.call(r,i)>=0?(s=e(this).data("slider-object"),s[i].apply(s,t)):(o=i,e(this).data("slider-object",new n(e(this),o)))})}}),e(function(){return e("[data-slider]").each(function(){var t,n,r,i;return t=e(this),r={},n=t.data("slider-values"),n&&(r.allowedValues=function(){var e,t,r,s;r=n.split(","),s=[];for(e=0,t=r.length;e<t;e++)i=r[e],s.push(parseFloat(i));return s}()),t.data("slider-range")&&(r.range=t.data("slider-range").split(",")),t.data("slider-step")&&(r.step=t.data("slider-step")),r.snap=t.data("slider-snap"),r.equalSteps=t.data("slider-equal-steps"),t.data("slider-theme")&&(r.theme=t.data("slider-theme")),t.attr("data-slider-highlight")&&(r.highlight=t.data("slider-highlight")),t.data("slider-animate")!=null&&(r.animate=t.data("slider-animate")),t.simpleSlider(r)})})})(this.jQuery||this.Zepto,this);

    (function($){

      $(document).ready(function (){

      var points = 0,
          radius = 0,
          rotate = 0;

      function draw_points(points, radius, rotate) {
        var elm       = 36;
        var r         = radius;
        var items     = points;
        var rotation  = rotate * (Math.PI / 180);

        var $this     = $('#center');
        var width     = $this.width();
        var height    = $this.height();
        var count     = 1;
        var elm_w     = elm / 2;
        var elm_h     = elm / 2;
        var parent_x  = width / 2;  //offset.left;// + width / 2;
        var parent_y  = height / 2; //offset.top;// + height / 2;
        var colors = [
                      'rgba(234,56,45,1)',
                      'rgba(234,60,80,1)',
                      'rgba(254,80,90,1)',
                      'rgba(200,80,90,1)',
                      'rgba(150,180,190,1)',
                      'rgba(120,100,190,1)',
                      'rgba(50,50,50,1)',
                      '#7BB200',
                      'rgba(20,20,20,1)',
                      'rgba(10,10,10,1)',
                      'rgba(40,40,40,1)'
                      ]

        $("#center").html('');
        $('#output_css').html('');

        $('#output').append( '<div>.point-container { position: relative; } </div>');

        for(var i = items; i > 0; i--) {

          var x = parent_x + r * Math.cos(2 * Math.PI * i / items + rotation) - elm_w;
          var y = parent_y + r * Math.sin(2 * Math.PI * i / items + rotation) - elm_h;
          var $point = $('<div></div>')
          $point.addClass('point')
          $point.css({
            left:x+"px",
            top:y+"px",
            background:colors[i]
          })
          $point.text(count)
          $("#center").append($point);

          $('#output_css').append( '<div>li:nth-child(' + (count) + ') { left:'+ parseFloat(x - parent_x).toFixed(2) +'px; top:'+ parseFloat(y - parent_y).toFixed(2) +'px; }</div>');

          count = count + 1;
        }

        $('#pol').html(points);
        $('#ral').html(radius);
        $('#rol').html(rotate);
      }

      function update_points(num) {
        points = num;
        draw_points(points, radius, rotate);
      }
      function update_radius(num) {
        radius = num;
        draw_points(points, radius, rotate);
      }
      //window.update_radius = update_radius;
      function update_rotate(num) {
        rotate = num;
        draw_points(points, radius, rotate);
      }
      //window.update_rotate = update_rotate;

      $("#points").bind("slider:changed", function (event, data) {
        //console.log('miles: ' + data.value);
        update_points(data.value);
      });
      $("#radius").bind("slider:changed", function (event, data) {
        //console.log('miles: ' + data.value);
        update_radius(data.value);
      });
      $("#rotate").bind("slider:changed", function (event, data) {
        //console.log('miles: ' + data.value);
        update_rotate(data.value);
      });

      update_points(10)
        
      function showAnimation () {
        var r_ = 0,a = 0;
        var timer = setInterval(function(){

          update_radius(r_)
          update_rotate(a*2.8)
          r_ = r_+ (a / 1.8)
          a++
        },15)
        setTimeout(function(){
          clearInterval(timer)
        },550)
      }
        
      function ocultar() {
        update_radius(0)
      }
      var $btnOff = $('.off');
      var $btnOn = $('.on');
      $btnOff.click(function(event) {
        ocultar()
      });
      $btnOn.click(function(event) {
        showAnimation()
      });


    });

    })(window.jQuery);