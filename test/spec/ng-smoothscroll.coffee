'use strict'

describe 'SmoothScroll', ->
  beforeEach module 'SmoothScroll'

  # instantiate service
  Smoothscroll = {}
  beforeEach inject (_SmoothScroll_) ->
    Smoothscroll = _SmoothScroll_

  it "should do something", () ->
    (5).should.equal 5