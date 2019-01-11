var directionDisplay;
var directionService;
var map;
var restaurant;

// RENDER MAP
function initMap () {
  directionDisplay = new google.maps.DirectionsRenderer()
  directionService = new google.maps.DirectionsService()

  let option = {
    center: {lat: -6.260548, lng: 106.781702},
    zoom:15
  }

  // render map
  map = new google.maps.Map(document.getElementById('map'), option)
  directionDisplay.setMap(map)
}

// POINTER
function pointer (lat, lng) {
  console.log(lat, lng);

  let option = {
    center: {lat: lat, lng: lng},
    zoom:15
  }

  // render map
  map = new google.maps.Map(document.getElementById('map'), option)
  directionDisplay.setMap(map)
  
  // set restaurant lat lng
  restaurant = new google.maps.LatLng(lat, lng)

  // set marker restaurant to map
  var marker = new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});

}

// DIRECTION
function direction () {
  var geocoder = new google.maps.Geocoder();

  // get element value address

  // get lat lng address
  // geocoder.geocode( { 'address': address}, function(results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     console.log(results[0].geometry.location)
  //     let lat = results[0].geometry.location.lat()
  //     let lng = results[0].geometry.location.lng()

      // convert lat lng
      let position = new google.maps.LatLng(-6.260548, 106.781702)
      
      var request = {
        origin: position,
        destination: restaurant,
        travelMode: 'DRIVING'
      }
      
      // get direction
      directionService.route(request, function(result, status) {
        if(status == 'OK') {
          directionDisplay.setDirections(result);
        }
      })
  //   }
  // });
}