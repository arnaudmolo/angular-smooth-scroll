"use strict"
var app = angular.module("smoothScrollExample", ["SmoothScroll"]);

app.controller("MainCtrl", ["$scope", "SmoothScroll", function($scope, SmoothScroll){

  $scope.goTo = function(x) {
    var promise = SmoothScroll.$goTo(500);
    promise.then(function(end){
      console.log("done", end);
    });
  }

}]);