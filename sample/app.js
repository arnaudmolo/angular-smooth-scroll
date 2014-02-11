"use strict"
var app = angular.module("smoothScrollExample", ["SmoothScroll"]);

app.controller("MainCtrl", ["$scope", "SmoothScroll", function($scope, SmoothScroll){

  $scope.goTo = function(x) {
    var promise = SmoothScroll.$goTo(600);
    promise.then(function(end){
      console.log("done", end);
    });
  }

  $scope.wiggle = function() {
    SmoothScroll.$goTo(0).then(function() {
      return SmoothScroll.$goTo(500);
    }).then(function() {
      return SmoothScroll.$goTo(200);
    }).then(function() {
      return SmoothScroll.$goTo(800);
    }).then(function() {
      return SmoothScroll.$goTo(0);
    }).then(function() {
      return SmoothScroll.$goTo("#go-cat");
    });
  };

  $scope.goToCat = function() {
    var cat = angular.element(document.getElementById("cat"));
    SmoothScroll.$goTo(cat).then(function() {
      alert('meow');
    });
  };

  $scope.goToDog = function() {
    SmoothScroll.$goTo("#dog").then(function() {
      alert('whouf');
    });
  }

}]);