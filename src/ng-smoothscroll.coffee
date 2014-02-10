angular.module("SmoothScroll", [])
  .factory "SmoothScroll", ["$q", ($q) ->

    getElementTop = (elem) ->
      yPos = elem.offsetTop
      tempEl = elem.offsetParent
      while tempEl?
        yPos += tempEl.offsetTop
        tempEl = tempEl.offsetParent
      yPos

    SmoothScroll = (start_y, stop_y, defer) ->
      distance = (if stop_y > start_y then stop_y - start_y else start_y - stop_y)
      if distance < 100
        scrollTo 0, stop_y
        defer.resolve leap_y
        return

      speed = Math.round distance / 100
      speed = 20 if speed > 20
      step = Math.round distance / 25

      leap_y = (if stop_y > start_y then start_y + step else start_y - step )
      timer = 0

      down = (leap_y, timer, end) ->
        setTimeout () ->
          scrollTo 0, leap_y
          defer.resolve leap_y if leap_y >= end
        , timer * speed

      up = (leap_y, timer, end) ->
        setTimeout () ->
          scrollTo 0, leap_y
          defer.resolve leap_y if leap_y <= end
        , timer * speed

      if stop_y > start_y
        i = start_y
        while i < stop_y
          down leap_y, timer, stop_y
          leap_y += step
          leap_y = stop_y if leap_y > stop_y
          timer++
          i += step
      i = start_y
      while i > stop_y
        up leap_y, timer, stop_y
        leap_y -= step
        leap_y = stop_y  if leap_y < stop_y
        timer++
        i -= step

    {
      $goTo: (y, x) ->
        defer = do $q.defer
        SmoothScroll window.pageYOffset, y, defer
        defer.promise.then undefined, (final_x = window.pageYOffset) ->
          window.onload = () -> scrollTo 0, final_x
    }
  ]