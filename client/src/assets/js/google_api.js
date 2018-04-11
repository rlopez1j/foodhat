// global variables
var search_value
var geolocation
var restaurant_list = []

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
        radius: '8046.72', // 5 mile radius (still deciding radius size)
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
                  6. if open
              TODO:
                1. create list with top 5 suggestions
                2. format with ui
                3. call $('#search').autocomplete with created list
                4. update list each time this function runs with new suggestions
              */
              if(i <= 5){ // check for undefine variables
                restaurant_list[i] = [ // makle this longer
                  restaurant_data.photos[0], // need to check this
                  restaurant_data.name,
                  restaurant_data.vicinity,
                  restaurant_data.opening_hours.open_now // find error with this attr
                ]
              }
              console.log(restaurant_data); // restaurant_data is json file
        })
        console.log(restaurant_list);
      }
    }
})
