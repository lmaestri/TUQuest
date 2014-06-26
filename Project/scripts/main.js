var map;
var pos;
var posInfo;
var coins = 0;

var playerIcon = {
  url : 'images/player.png',
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

var chestDescriptions = {}

chestDescriptions['see'] = {
  position : new google.maps.LatLng(48.199188,16.371275)
};

chestDescriptions['haupteingang'] = {
  position : new google.maps.LatLng(48.199050,16.369963)
};

chestDescriptions['josef_hadersperger'] = {
  position : new google.maps.LatLng(48.199188,16.370961)
};

var markerTypes = {};

markerTypes['player'] = {
  map : null,
  icon : playerIcon,
  title : 'Player',
  draggable : true,
  zIndex : 2
};

markerTypes['chest'] = {
  map : null,
  icon : chestIcon,
  title : 'Chest',
  draggable : true,
  zIndex : 1
};

var playerMarker;

var chestArray = [];

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
  radius: 15
});

function initialize() {
  posInfo = document.getElementById('info');
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
  playerMarker = new google.maps.Marker(markerTypes['player']);
  playerMarker.setMap(map);
  
  circle.setMap(map);
  circle.bindTo('center', playerMarker, 'position');
  
  addChest(chestDescriptions['see']);
  addChest(chestDescriptions['haupteingang']);
  addChest(chestDescriptions['josef_hadersperger']);

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
  playerMarker.setPosition(pos);
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
  posInfo.innerHTML = "<span>" + content + "</span>";
}

function writeInfo(position){
  posInfo.innerHTML = "<span>" + "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "</span>";
}

function addChest(location) {
  var marker = new google.maps.Marker(markerTypes['chest']);
  marker.setMap(map);
  marker.setPosition(location);
  chestArray.push(marker);
  google.maps.event.addListener(marker, 'click', function(){
    onClickChest(marker, event);
  });
}

function addChest(chestDescription) {
  var marker = new google.maps.Marker(markerTypes['chest']);
  marker.setMap(map);
  marker.setPosition(chestDescription.position);
  chestArray.push(marker);
  google.maps.event.addListener(marker, 'click', function(){
    onClickChest(marker, event);
  });
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (chestArray) {
    for (i in chestArray) {
      chestArray[i].setMap(null);
    }
  }
}

// Shows any overlays currently in the array
function showOverlays() {
  if (chestArray) {
    for (i in chestArray) {
      chestArray[i].setMap(map);
    }
  }
}

function clearChest(chestToDelete){
  if(chestArray){
    for( i in chestArray){
      if(chestArray[i] === chestToDelete){
        chestArray[i].setMap(null);
      }
    }
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (chestArray) {
    for (i in chestArray) {
      chestArray[i].setMap(null);
    }
    chestArray.length = 0;
  }
}

function onClickChest(marker, event){
  var bounds = circle.getBounds();
  if(bounds.contains(marker.position)){
    coins = coins + Math.floor(Math.random()*5)+1;
    clearChest(marker);
    content = "Found <b>" + coins + " coins</b>!";
    openInfoWindow(content, playerMarker);
  }
}

function openInfoWindow(contentText, marker){
  contentText = "<div id = 'infoWindow'>" + contentText + "</div>";
  infowindow = new google.maps.InfoWindow({
      content: contentText
  });
  infowindow.open(map,marker);
  setTimeout(function(){infowindow.close()}, 1000);
}

google.maps.event.addDomListener(window, 'load', initialize);