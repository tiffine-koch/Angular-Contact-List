'use strict';

console.log('main js');

var app = angular.module('MyApp', ['ngStorage']); //instantiating new module named 'myapp'

app.controller('mainCtrl', function($scope, $localStorage) {
  $scope.storage = $localStorage;

  if(!$localStorage.localArray) {
    $localStorage.localArray = [];
  };
  $scope.contacts = $localStorage.localArray;

  console.log('hello from mainCtrl');

  $scope.keys = Object.keys;

  $scope.addContact = function() {
    console.log('here');
    $scope.contacts.push($scope.newContact);
    $scope.contacts = $localStorage.localArray;
    $scope.newContact = {};
    // $scope.newContact = '';
  };

  $scope.removeContact = function(contact) {
    var index = $scope.contacts.indexOf(contact);
    $scope.contacts.splice(index, 1);
  };

  $scope.editContact = function(newContact) {
    console.log(newContact);
    $scope.contacts.push($scope.newContact);
    $scope.contacts = $localStorage.localArray;
    $scope.newContact = {};
    // var index = $scope.contacts.indexOf(newContact);
    // $scope.contacts.splice(index, 1);
  };
});
