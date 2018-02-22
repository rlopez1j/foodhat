$(function(){
  var socket = io.connect('http://localhost:3000')
  var latitude, longitude;
  // getting location from user
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      console.log("lad & long: "+position.coords.latitude+", "+position.coords.longitude)

      // store the location in vars. Eventually use them for the Google Places API
      latitude = position.coords.latitude
      longitude = position.coords.longitude

      // when person starts typing start predictions
      $('#search').on('focus', function(){ // 'focus' may not be the handler i want
        // google places api autocomplete stuff will go here
      })
    })
  }
})
