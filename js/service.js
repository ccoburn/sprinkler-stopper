angular.module('sprinkler').service('service', function($http) {


 var id = '4d055b630b448d8f'
 this.zip = '84043'

  this.getData = function() {
    return $http.get('http://api.wunderground.com/api/' + id + '/conditions/q/' + this.zip + '.json').then(function(response)
    {
      console.log(response.data.current_observation)
      return response.data.current_observation
    })
  }










})
