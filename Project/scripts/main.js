
var map;
var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 0.1,
    strokeColor: 'gold',
    strokeWeight: 1
  };
var marker = new google.maps.Marker({
		icon: goldStar,
		map: map
	  });

function initialize() {

  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.watchPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      /**
	  var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });
	  */
	  
	  marker.setPosition(pos);
	  
	  //addMarker(goldstar);

      map.setCenter(pos);
	  
	var x = document.getElementById("pos");
	x.innerHTML="Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	

	  
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

function addMarker(icon){
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		icon: icon,
		map: map
	});


}



google.maps.event.addDomListener(window, 'load', initialize);