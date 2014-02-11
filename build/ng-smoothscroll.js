(function() {
  angular.module("SmoothScroll", []).factory("SmoothScroll", [
    "$q", function($q) {
      var SmoothScroll, getElementTop;
      getElementTop = function(elem) {
        var tempEl, yPos;
        yPos = elem.offsetTop;
        tempEl = elem.offsetParent;
        while (tempEl != null) {
          yPos += tempEl.offsetTop;
          tempEl = tempEl.offsetParent;
        }
        return yPos;
      };
      SmoothScroll = function(start_y, stop_y, defer) {
        var distance, down, i, leap_y, speed, step, timer, up, _results;
        distance = (stop_y > start_y ? stop_y - start_y : start_y - stop_y);
        if (distance < 100) {
          scrollTo(0, stop_y);
          defer.resolve(leap_y);
          return;
        }
        speed = Math.round(distance / 100);
        if (speed > 20) {
          speed = 20;
        }
        step = Math.round(distance / 25);
        leap_y = (stop_y > start_y ? start_y + step : start_y - step);
        timer = 0;
        down = function(leap_y, timer, end) {
          return setTimeout(function() {
            scrollTo(0, leap_y);
            if (leap_y >= end) {
              return defer.resolve(leap_y);
            }
          }, timer * speed);
        };
        up = function(leap_y, timer, end) {
          return setTimeout(function() {
            scrollTo(0, leap_y);
            if (leap_y <= end) {
              return defer.resolve(leap_y);
            }
          }, timer * speed);
        };
        if (stop_y > start_y) {
          i = start_y;
          while (i < stop_y) {
            down(leap_y, timer, stop_y);
            leap_y += step;
            if (leap_y > stop_y) {
              leap_y = stop_y;
            }
            timer++;
            i += step;
          }
        }
        i = start_y;
        _results = [];
        while (i > stop_y) {
          up(leap_y, timer, stop_y);
          leap_y -= step;
          if (leap_y < stop_y) {
            leap_y = stop_y;
          }
          timer++;
          _results.push(i -= step);
        }
        return _results;
      };
      return {
        $goTo: function(y, x) {
          var defer, _ref;
          if (((_ref = y[0]) != null ? _ref.tagName : void 0) != null) {
            y = getElementTop(y[0]);
          }
          if (y.tagName != null) {
            y = getElementTop(y);
          }
          if (typeof y === "string") {
            y = getElementTop(document.querySelector(y));
          }
          defer = $q.defer();
          SmoothScroll(window.pageYOffset, y, defer);
          return defer.promise.then(void 0, function(final_x) {
            if (final_x == null) {
              final_x = window.pageYOffset;
            }
            return window.onload = function() {
              return scrollTo(0, final_x);
            };
          });
        }
      };
    }
  ]);

}).call(this);
