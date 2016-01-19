var map;
var service;
var infowindow;
var coords = [];

function initialize() {
  var center = new google.maps.LatLng(39.839418, 0);
  var location = getZone("denver, co");

  map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 2
    });

  // console.log("setlist is: " + setlist().length)
  var request = {
    location: center,
    radius: '50',
    query: 'fillmore denver co'
  };

  console.log("Query is: " + request.query)
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);


}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
    function createMarker(position) {
      getCoords(position.formatted_address)
  }
}
}


function getCoords(address){
  var obj1;
  console.log("address is " + address)
  var getter = $.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAYUDLJ7lxoWbuskxEjwAhCYn2beys99W0",
  // url: "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyAYUDLJ7lxoWbuskxEjwAhCYn2beys99W0",
  method: "GET",
  dataType: "json"
});
getter.done(function(response){
  var lat = response.results[0].geometry.location.lat
  var lng = response.results[0].geometry.location.lng
  console.log("lat: " + lat)
  console.log("lng: " + lng)
  var obj = {lat: lat, lng: lng}
  coords.push(obj)
  marker()
});

};
function getZone(address){
  var getter = $.ajax({
  url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAYUDLJ7lxoWbuskxEjwAhCYn2beys99W0",
  // url: "https://maps.googleapis.com/maps/api/place/textsearch/xml?query=restaurants+in+Sydney&key=AIzaSyAYUDLJ7lxoWbuskxEjwAhCYn2beys99W0",
  method: "GET",
  dataType: "json"
});
getter.done(function(response){
  var lat = response.results[0].geometry.location.lat
  var lng = response.results[0].geometry.location.lng
  return google.maps.LatLng(lat, lng)
});
};

function tester(word){
  console.log(word)
}

initialize()
  function marker(){
    console.log("*****" + coords[0])
    var marker = new google.maps.Marker({
      position: coords[0],
      map: map
    })
  }
