
var map;
var pos;
var infoParagraph;

var playerIcon = {
  url : 'images/player_small.png',
  size : new google.maps.Size(32,32),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(16, 16)
};

var chestIcon = {
  url : 'images/chest.png',
  size : new google.maps.Size(32,32),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(16, 16)
};

var markerTypes = {};

markerTypes['player'] = {
  map : null,
  icon : playerIcon,
  title : 'Player',
  zIndex : 1
};

markerTypes['chest'] = {
  map : null,
  icon : chestIcon,
  title : 'Chest',
  zIndex : 2
};

var playerMarker;

var markersArray = [];

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

function initialize() {
  infoParagraph = document.getElementById('info');
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  circle.setMap(map);
  
  playerMarker = new google.maps.Marker(markerTypes['player']);
  playerMarker.setMap(map);

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
  playerMarker.setPosition(pos);
  chestPos = new google.maps.LatLng(position.coords.latitude - 0.000001, position.coords.longitude);
  addMarker(markerTypes['chest'], )
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

function writeInfo(content){
  infoParagraph.innerHTML = content;
}

function writeInfo(position){
  infoParagraph.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
}

function addMarker(location, markerType) {
  marker = new google.maps.Marker(markerType);
  marker.setMap(map);
  marker.setPosition(location);
  markersArray.push(marker);
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
  }
}

// Shows any overlays currently in the array
function showOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(map);
    }
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    markersArray.length = 0;
  }
}

google.maps.event.addDomListener(window, 'load', initialize);