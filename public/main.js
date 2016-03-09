'use strict';

console.log('main js');
var newContact, index;

var app = angular.module('MyApp', []);

app.controller('mainCtrl', function($scope, $http) {
  console.log('hello from mainCtrl');
  $scope.contacts = [];

  function getAllContacts() {
    $http({
      method: 'GET',
      url: '/contacts',
    })
    .then(function (res) {
      $scope.contacts = res.data;
      console.log(res.data);
      console.log($scope.contacts);
    }, function (err) {
      console.error('ERR', err);
    });
  }
  getAllContacts();

  $scope.addContact =function() {
    console.log('click');
    newContact = $scope.contact;

      $http({
        method: 'POST',
        url: '/contacts',
        data: {name: $scope.contact.name, email: $scope.contact.email, location: $scope.contact.location,
          phone: $scope.contact.phone,
          spirit: $scope.contact.spirit
        }
      })
      .then(function(res) {
        $scope.contacts.push(newContact);
      }, function(err) {
        console.error(err);
      })
      $scope.contact = {};
  }


  $scope.deleteContact = function(contact) {
    index = $scope.contacts.indexOf(contact);
    $http({
      method: 'DELETE',
      url: `/contacts/${index}`
    })
    .then(function(data) {
      $scope.contacts.splice(index, 1);
    }, function(err) {
      console.error(err);
    })
  }

  $scope.editContact = function(newContact) {
    index = $scope.contacts.indexOf(newContact);
    $scope.contacts.push($scope.contact);
    $http({
      method: 'PUT',
      url: `/contacts/${index}`,
      data: index
    })
    .then(function(data){
      addContact();
      console.log('data', data);
    }, function(err){
      console.error(err);
    })
  };
    $scope.contact = {};
});
