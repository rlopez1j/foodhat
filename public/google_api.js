// global variables
var search_value
var geolocation

$(document).ready(function(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        // format location for google api
        geolocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      })

      service = new google.maps.places.PlacesService($('.rest')[0])

      $('#search').on('keyup',function(){
        /* create exceptions for key presses that are not
           actual user input (e.g. keyboard shortcuts) */
        search_value = $('#search').val()
        make_google_search(search_value)
      })
    }else{
      /* this will probably be more complicated
         in the future. Find base case when user
         does not want to give location */
      alert("Give location permissions!")
    }

    function make_google_search(search){
      var options = {
        location: geolocation,
        radius: '8046.72', // 5 mile radius
        name: search_value, // updates as user types
        type: ['restaurant'] // duh
      };

      service.nearbySearch(options, callback)
    }

    function callback(restaurants, status){
      if(status == google.maps.places.PlacesServiceStatus.OK){
        $.each(restaurants, function(i, restaurant_data){
          /* list restaurant info in autocomplete format:
                will have:
                  1. restaurant logo (if any)
                  2. restaurant name
                  3. restaurant addr
                  4. distance (maybe)
                  5. restrict to like 5 results
                  6. button to 'select' restaurant */
          console.log(restaurant_data); // restaurant_data is json file
        })
      }
    }
})
