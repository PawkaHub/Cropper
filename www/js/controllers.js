// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $cordovaCamera, $jrCrop, $ionicPopup, $log) {

  $scope.takePhoto = function() {
    $log.log('takePhoto');
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 50,
      saveToPhotoAlbum: false
    };
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.photo = "data:image/jpeg;base64," + imageURI;
    }, function(err) {
      // error
      $ionicPopup.alert({
        template: '<em>' + err + '</em>',
        title: 'Capture Error'
      });
    });
  }

  $scope.cropPhoto = function() {
    $log.log('cropPhoto');
    $jrCrop.crop({
      url: $scope.photo,
      width: 200,
      height: 200,
      title: 'Move and Scale'
    }).then(function(canvas) {
      // success!
      //var image = canvas.toDataURL();
      $scope.photo = canvas.toDataURL();
      $scope.cropped = true;
    }, function() {
      // User canceled or couldn't load image.
      $ionicPopup.alert({
        template: '<em>Crop Error</em>',
        title: 'Couldn\'t Crop Image!'
      });
    });
  }

  $scope.resetPhoto = function() {
    $log.log('resetPhoto');
    $scope.photo = null;
    $scope.cropped = null;
  }
})