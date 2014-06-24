
var map;
var pos;
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
    zoom: 16
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      
	 /* var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });
	  */
	map.setCenter(pos);


	marker.setPosition(pos);
	
	var circle = {
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.35,
      map: map,
	  radius: 30
    };


	var radius = new google.maps.Circle(circle);
	radius.bindTo('center', marker, 'position');

	  
	  //addMarker(goldstar);
	  
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  
  watchPosition();
  
}

function watchPosition(){
	if(navigator.geolocation) {
		navigator.geolocation.watchPosition(function(position) {
		  pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		  
		var x = document.getElementById("pos");
		x.innerHTML="Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
		
		marker.setPosition(pos);
		
		}, function() {
		  handleNoGeolocation(true);
		});
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