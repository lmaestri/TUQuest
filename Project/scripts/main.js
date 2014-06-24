
var map;
var pos;
var infoParagraph;

var mapOptions = {
    zoom: 18,
    disableDefaultUI: true
};

var circle = new google.maps.Circle({
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  map: map,
  clickable: false,
  radius: 30
});

var marker = new google.maps.Marker({
      map: null,
      title: 'Player'
});

function initialize() {
  infoParagraph = document.getElementById('info');
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  circle.setMap(map);
  watchPosition();
}

function watchPosition(){
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(setPosition, showError);
	}else{
    writeInfo('Browser does not support geolocation.');
  }
}

function setPosition(position){
  pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  map.panTo(pos);
  circle.setCenter(pos);
  alert(circle.center)
  writeInfo(position);
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          writeInfo("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          writeInfo("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          writeInfo("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          writeInfo("An unknown error occurred.");
          break;
  }
}

function addMarker(icon){
	var marker = new google.maps.Marker({
		position: map.getCenter(),
		icon: icon,
		map: map
  });
}

function writeInfo(content){
  infoParagraph.innerHTML = content;
}

function writeInfo(position){
  infoParagraph.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

google.maps.event.addDomListener(window, 'load', initialize);