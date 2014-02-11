'use strict'

describe 'SmoothScroll', ->

  document.body.style.height = "5000px"

  beforeEach module 'SmoothScroll'

  # instantiate service
  Smoothscroll = {}
  beforeEach inject (_SmoothScroll_) ->
    Smoothscroll = _SmoothScroll_

  it "should have a $goTo function", () ->
    Smoothscroll.$goTo.should.be.a.function

  describe '$goTo', ->
    it 'should return a promise', () ->
      promise = Smoothscroll.$goTo 500
      promise.then.should.be.a.function