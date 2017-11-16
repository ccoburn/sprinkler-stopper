angular.module('sprinkler').controller('mainCtrl', function($scope, service) {

  $scope.test = "hello, this app is working"

  $scope.getData = function() {
    service.getData().then(function(response) {
      $scope.data = response;
      $scope.weatherImage = response.icon_url
      var temp = parseInt(response.temp_f)
      $scope.sprinkler = "Sprinklers will run if current conditions continue"
      if (temp < 38 || response.weather === 'Rain' || response.weather === "Light Rain") {
        console.log('nope');
        $scope.sprinkler = "No sprinklers likely today"
      }
    })
  }

  $scope.getDataAtTime = function() {
    service.getData().then(function(response) {
      $scope.data = response;
      $scope.weatherImage = response.icon_url
      var temp = parseInt(response.temp_f)
      $scope.sprinkler = "Sprinklers turning on"
      $scope.timeChecked = true;
      $scope.backgroundYes = true;
      if (temp < 38 || response.weather === 'Rain' || response.weather === "Light Rain") {
        $scope.sprinkler = "No sprinklers. Congrats, you saved water";
        $scope.backgroundNo = true;
        $scope.backgroundYes = false;
      }
    })
  }

  $scope.getData();

  $scope.sendZip = function(addZip) {
    service.zip = addZip;
    $scope.getData();
    $scope.backgroundNo = false;
    $scope.backgroundYes = false;
    $scope.timeChecked = false;
  }


  $scope.sprinklerHour = 18;
  $scope.sprinklerMinute = 55;
  $scope.timer = function() {
    var now = new Date();
    $scope.millisTill = new Date(now.getFullYear(), now.getMonth(), now.getDate(), $scope.sprinklerHour, $scope.sprinklerMinute, 0, 0) - now;
    if ($scope.millisTill < 0) {
      $scope.millisTill += 86400000; // it's after 10am, try 10am tomorrow.
    }

    setTimeout(function() {
      $scope.getDataAtTime()
    }, $scope.millisTill);

    }
    $scope.timer();

$scope.timer2 = function() {
  var now2 = new Date()
  $scope.millisTill2 = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate(), $scope.sprinklerHour, $scope.sprinklerMinute, 0, 0) - now2;
  if ($scope.millisTill2 < 0) {
    $scope.millisTill2 += 86400000; // it's after 10am, try 10am tomorrow.
  }

  //Get hours from milliseconds
  var hours = $scope.millisTill2 / (1000*60*60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  $scope.timeLeft = h + ':' + m + ':' + s;

}

$scope.changeTime = function(updateHour, updateMinute) {
  $scope.sprinklerHour = updateHour;
  $scope.sprinklerMinute = updateMinute;
  $scope.timer();
  $scope.timer2();

}

setTimeout(function() {
  $scope.getDataAtTime()
}, $scope.millisTill);

  setInterval(function() {
    $scope.$apply(function() {
      $scope.timer2()
    })
  }, 1000)

  //another setTimeout that changes the value in scope every second so we can see it on the screen and then set up the ability to change the target for both countdowns simultaniously

})
