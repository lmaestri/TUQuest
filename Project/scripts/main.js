var map;
var pos;
var posInfo;

var ects = 0;
var hours = 0;
var examsLeft = 3;
var registered = false;

var playerIcon = {
  url : 'images/player.png',
  size : new google.maps.Size(18,25),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(8, 12)
};

var chestIcon = {
  url : 'images/chest.png',
  size : new google.maps.Size(32,32),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(16, 16)
};

var itemIcon = {
  url : 'images/book.png',
  size : new google.maps.Size(32,27),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(16, 13)
};

var professorIcon = {
  url : 'images/professor.png',
  size : new google.maps.Size(17,25),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(8, 12)
};

var papersIcon = {
  url : 'images/papers.png',
  size : new google.maps.Size(26,22),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(13, 11)
};

var bookIcon = {
  url : 'images/book.png',
  size : new google.maps.Size(32,27),
  origin: new google.maps.Point(0,0),
  anchor: new google.maps.Point(16, 13)
};

var itemDescriptions = {};

itemDescriptions['professor'] = {
  position : new google.maps.LatLng(48.198915,16.370419),
  type : "professor"
};

itemDescriptions['haupteingang'] = {
  position : new google.maps.LatLng(48.199050,16.369963),
  type : "studentID"
};

itemDescriptions['book1'] = {
  position : new google.maps.LatLng(48.199206, 16.371269),
  type : "book"
}

itemDescriptions['book2'] = {
  position : new google.maps.LatLng(48.199154, 16.371857),
  type : "book"
}

itemDescriptions['book3'] = {
  position : new google.maps.LatLng(48.198852, 16.371996),
  type : "book"
}

itemDescriptions['book4'] = {
  position : new google.maps.LatLng(48.199546, 16.371149),
  type : "book"
}

itemDescriptions['book5'] = {
  position : new google.maps.LatLng(48.198578, 16.371202),
  type : "book"
}

itemDescriptions['book6'] = {
  position : new google.maps.LatLng(48.198693, 16.370912),
  type : "book"
}

itemDescriptions['book7'] = {
  position : new google.maps.LatLng(48.198643, 16.371728),
  type : "book"
}

itemDescriptions['book8'] = {
  position : new google.maps.LatLng(48.199188,16.370961),
  type : "book"
};

itemDescriptions['book9'] = {
  position : new google.maps.LatLng(48.199628, 16.370223),
  type : "book"
};

itemDescriptions['book10'] = {
  position : new google.maps.LatLng(48.199867, 16.369630),
  type : "book"
};

itemDescriptions['book11'] = {
  position : new google.maps.LatLng(48.199937, 16.370078),
  type : "book"
};

itemDescriptions['book12'] = {
  position : new google.maps.LatLng(48.199925, 16.368970),
  type : "book"
};

itemDescriptions['book13'] = {
  position : new google.maps.LatLng(48.199446, 16.368600),
  type : "book"
};

itemDescriptions['book14'] = {
  position : new google.maps.LatLng(48.199276, 16.369144),
  type : "book"
};

itemDescriptions['book15'] = {
  position : new google.maps.LatLng(48.199717, 16.368774),
  type : "book"
};

itemDescriptions['book16'] = {
  position : new google.maps.LatLng(48.199617, 16.369817),
  type : "book"
};

itemDescriptions['book17'] = {
  position : new google.maps.LatLng(48.199866, 16.371657),
  type : "book"
};

itemDescriptions['book18'] = {
  position : new google.maps.LatLng(48.199535, 16.372422),
  type : "book"
};

itemDescriptions['book19'] = {
  position : new google.maps.LatLng(48.200180, 16.368947),
  type : "book"
};

itemDescriptions['book20'] = {
  position : new google.maps.LatLng(48.199276, 16.370103),
  type : "book"
};

itemDescriptions['book21'] = {
  position : new google.maps.LatLng(48.200113, 16.371171),
  type : "book"
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
  draggable : false,
  zIndex : 1
};

markerTypes['papers'] = {
  map : null,
  icon : papersIcon,
  title : 'Papers',
  draggable : false,
  zIndex : 1
};

markerTypes['professor'] = {
  map : null,
  icon : professorIcon,
  title : 'Professor',
  draggable : false,
  zIndex : 1
};

markerTypes['book'] = {
  map : null,
  icon : bookIcon,
  title : 'Book',
  draggable : false,
  zIndex : 1
};

var playerMarker;

var itemArray = [];

var mapOptions = {
    zoom: 18,
    disableDefaultUI: true,
    minZoom : 17,
    maxZoom : 19
};

var circle = new google.maps.Circle({
  strokeColor: '#0000FF',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#0000FF',
  fillOpacity: 0.35,
  map: map,
  clickable: false,
  radius: 20
});

function initialize() {
  posInfo = document.getElementById('info');

  var styles = [
    {
      featureType: "all",
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        { hue: "#00ffee" },
        { saturation: 50 }
      ]
    },{
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  map.setOptions({styles: styles});

  playerMarker = new google.maps.Marker(markerTypes['player']);
  playerMarker.setMap(map);
  google.maps.event.addListener(playerMarker, 'click', resetPlayer);

  circle.setMap(map);
  circle.bindTo('center', playerMarker, 'position');
  
  addItem(itemDescriptions['book1'], markerTypes['book']);
  addItem(itemDescriptions['book2'], markerTypes['book']);
  addItem(itemDescriptions['book3'], markerTypes['book']);
  addItem(itemDescriptions['book4'], markerTypes['book']);
  addItem(itemDescriptions['book5'], markerTypes['book']);
  addItem(itemDescriptions['book6'], markerTypes['book']);
  addItem(itemDescriptions['book7'], markerTypes['book']);
  addItem(itemDescriptions['book8'], markerTypes['book']);
  addItem(itemDescriptions['book9'], markerTypes['book']);
  addItem(itemDescriptions['book10'], markerTypes['book']);
  addItem(itemDescriptions['book11'], markerTypes['book']);
  addItem(itemDescriptions['book12'], markerTypes['book']);
  addItem(itemDescriptions['book13'], markerTypes['book']);
  addItem(itemDescriptions['book14'], markerTypes['book']);
  addItem(itemDescriptions['book15'], markerTypes['book']);
  addItem(itemDescriptions['book16'], markerTypes['book']);
  addItem(itemDescriptions['book17'], markerTypes['book']);
  addItem(itemDescriptions['book18'], markerTypes['book']);
  addItem(itemDescriptions['book19'], markerTypes['book']);
  addItem(itemDescriptions['book20'], markerTypes['book']);
  addItem(itemDescriptions['book21'], markerTypes['book']);

  addItem(itemDescriptions['haupteingang'], markerTypes['papers']);
  
  addItem(itemDescriptions['professor'], markerTypes['professor']);
  

  watchPosition();
}

function watchPosition(){
	if(navigator.geolocation) {
		navigator.geolocation.watchPosition(setPosition, showError);
	}else{
    writeInfo('Browser does not support geolocation.');
  }
}

function resetPlayer(){
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

function addItem(location, markerType) {
  var marker = new google.maps.Marker(markerType);
  marker.setMap(map);
  marker.setPosition(location);
  itemArray.push(marker);
  google.maps.event.addListener(marker, 'click', function(){
    onClickItem(marker, event);
  });
}

function addItem(itemDescription, markerType) {
  var marker = new google.maps.Marker(markerType);
  marker.setMap(map);
  marker.setPosition(itemDescription.position);
  marker.itemDescription = itemDescription;
  itemArray.push(marker);
  google.maps.event.addListener(marker, 'click', function(){
    onClickItem(marker, event);
  });
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
  if (itemArray) {
    for (i in itemArray) {
      itemArray[i].setMap(null);
    }
  }
}

// Shows any overlays currently in the array
function showOverlays() {
  if (itemArray) {
    for (i in itemArray) {
      itemArray[i].setMap(map);
    }
  }
}

function clearItem(itemToDelete){
  if(itemArray){
    for( i in itemArray){
      if(itemArray[i] === itemToDelete){
        itemArray[i].setMap(null);
      }
    }
  }
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
  if (itemArray) {
    for (i in itemArray) {
      itemArray[i].setMap(null);
    }
    itemArray.length = 0;
  }
}

function onClickItem(marker, event){
  var bounds = circle.getBounds();
  if(bounds.contains(marker.position)){
    if(marker.itemDescription.type === "book"){
      readBook();
      clearItem(marker);
    } else if(marker.itemDescription.type === "professor"){
      talkToProfessor(marker);
    } else if(marker.itemDescription.type === "studentID"){
      registerAsStudent();
      clearItem(marker);
    }
  }
}

function readBook(){
  var studied =  Math.floor(Math.random()*50)+251;
  hours = hours + studied;
  var content = "Studied for <b>" + studied + " hours</b>!";
  updateHours();
  openInfoWindow(content, playerMarker, 1000);
}

function talkToProfessor(professorMarker){
  if(registered){
    if(examsLeft == 3){
      if(hours == 0){
        var content ="Good! Your first exam awards you with <b>30 ECTS</b>. Go read books if you dont study enough you will fail the exam.";
        openInfoWindow(content, professorMarker, 3000);  
      }else{
        if(hours < 900){
          var content ="You <b>FAIL</b>!";
          openInfoWindow(content, professorMarker, 3000);
        }else{
          var content ="Very good my disciple! Your second exam awards you with <b>60 ECTS</b>. You will need to read more books this time.";
          openInfoWindow(content, professorMarker, 3000);
          
          examsLeft = examsLeft -1;
          ects = ects + 30;
          hours = 0;

          updateEcts();
          updateExams();
          updateHours();
        }
      }
    }else if(examsLeft == 2){
      if(hours == 0){
        var content ="Read read read...Will you have enough books left for the last exam?";
        openInfoWindow(content, professorMarker, 3000);  
      }else{
        if(hours < 1800){
          var content ="You <b>FAIL</b>!";
          openInfoWindow(content, professorMarker, 3000);
        }else{
          examsLeft = examsLeft -1;
          ects = ects + 60;
          hours = 0;

          updateEcts();
          updateExams();
          updateHours();

          var content ="Great! Your last exam awards you with <b>90 ECTS</b>. You will need to read more books this time.";
          openInfoWindow(content, professorMarker, 3000);
        }
      }
    }else if(examsLeft == 1){
      if(hours == 0){
        var content ="Enough books left for the last exam? Lets see!";
        openInfoWindow(content, professorMarker, 3000);  
      }else{
        if(hours < 2700){
          var content ="You <b>FAIL</b>!";
          openInfoWindow(content, professorMarker, 3000);
        }else{
          examsLeft = examsLeft -1;
          ects = ects + 90;
          hours = 0;

          updateEcts();
          updateExams();
          updateHours();

          var content ="Excellent work my dear student! Your passed your last exam and now you are a <b>'Bachelor of Science'</b>! Now go drink a beer and leave me alone...";
          openInfoWindow(content, professorMarker, 3000);
        }
      }
    }else if(examsLeft == 0){
      if(ects == 180){
        var content ="Do I know you?";
        openInfoWindow(content, professorMarker, 3000);  
      }else if(ects == 90){
        var content ="Nice try. Maybe next year you will succed.";
        openInfoWindow(content, professorMarker, 3000);
      }else {
        var content ="Maybe you should try studying arts?";
        openInfoWindow(content, professorMarker, 3000);
      }

    }
  }else{
    var content ="Your are not registerd yet go find your <b>StudentID</b> and come back to me!";
    openInfoWindow(content, professorMarker, 3000);
  }
}

function registerAsStudent(){
  registered = true;
  var content ="Found a <b>StudentID</b> in front of the entrance. Close enough, lets go back to the professor!";
  openInfoWindow(content, playerMarker, 3000);
}

function openInfoWindow(contentText, marker, delay){
  contentText = "<div id = 'infoWindow'>" + contentText + "</div>";
  infowindow = new google.maps.InfoWindow({
      content: contentText
  });
  infowindow.open(map,marker);
  setTimeout(function(){infowindow.close()}, delay);
}

function updateEcts(){
  var ectsSpan = document.getElementById("ects");
  ectsSpan.innerHTML = "ECTS: " + ects;
}

function updateHours(){
  var hoursSpan = document.getElementById("hours");
  hoursSpan.innerHTML = "Hours spent studying: " + hours;
}

function updateExams(){
  var examsSpan = document.getElementById("exams");
  examsSpan.innerHTML = "Exams left: " + examsLeft; 
}

google.maps.event.addDomListener(window, 'load', initialize);