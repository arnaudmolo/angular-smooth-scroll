angular-smooth-scroll
=====================

A smoothscroll service promise based for AngularJS

Based on [Arnaud Breton's algorithme](https://github.com/arnaudbreton/angular-smoothscroll) and promises

How To
======

include the ```SmoothScroll``` in your application dependencies

```SmoothScroll.$goTo(param)``` return a promises resolved when the scroll is done

``
  var promise = SmoothScroll.$goTo(600);
  promise.then(function(end){
    console.log("done", end);
  });
``

```
  SmoothScroll.$goTo(0).then(function() {
    return SmoothScroll.$goTo(500);
  }).then(function() {
    return SmoothScroll.$goTo(200);
  }).then(function() {
    return SmoothScroll.$goTo(800);
  }).then(function() {
    return SmoothScroll.$goTo(0);
  }).then(function() {
    return SmoothScroll.$goTo(200);
  });
```

``$goTo`` accepts :
  * number
  * simple DOM element
  * angular element
  * selector

---------

Next step:
=======
* tests!
* accept elements as arguments
* accept Y scrolls
