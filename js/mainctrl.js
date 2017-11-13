angular.module('sprinkler').controller('mainCtrl', function($scope, service){

$scope.test= "hello, this app is working"

$scope.getData = function() {
  service.getData().then(function(response){
    $scope.data = response;
    $scope.weatherImage = response.icon_url
  })
  }
  $scope.getData();

 })
