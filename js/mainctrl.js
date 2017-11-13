angular.module('sprinkler').controller('mainCtrl', function($scope, service){

$scope.test= "hello, this app is working"

$scope.getData = function() {
  service.getData().then(function(response){
    $scope.data = response;
    $scope.weatherImage = response.icon_url
    var temp = parseInt(response.temp_f)
    $scope.sprinkler = "Sprinklers are a go"
    if ( temp < 38 || response.weather === 'Rain' || response.weather === "Light Rain") {
      console.log('nope');
        $scope.sprinkler = "No sprinklers today"
    }
    console.log("it ran");
  })
  }
  $scope.getData();

$scope.sendZip = function(addZip) {
  service.zip = addZip;
  $scope.getData();
 }

 var now = new Date();
$scope.millisTill15 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 30, 0, 0) - now;
console.log($scope.millisTill15);
if ($scope.millisTill15 < 0) {
     $scope.millisTill15 += 86400000; // it's after 10am, try 10am tomorrow.
}

setTimeout(function(){ $scope.getData() }, $scope.millisTill15);


 })
