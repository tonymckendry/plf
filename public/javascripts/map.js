var map;
var service;
var infowindow;
var coords = [];
var locs = [];

function getLocs(){
  var count = document.getElementById('0').innerHTML
  for (var i = 0; i < count; i++) {
    var j = i + 1
    locs.push(document.getElementById(j).innerHTML)
  }
  console.log(locs)
}


function initialize(places) {
  var center = new google.maps.LatLng(39.839418, -15);
  var location = getZone("denver, co");

  map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 3
    });

  console.log('locs: ' + locs.length);
  var il = 0
  function myLoop () {           //  create a loop function
     setTimeout(function () {    //  call a 3s setTimeout when the loop is called
        requ();          //  your code here
        il++;                     //  increment the counter
        if (il < locs.length) {            //  if the counter < 10, call the loop function
           myLoop();             //  ..  again which will trigger another
        }                        //  ..  setTimeout()
     }, 500)
  }
  myLoop()
  function requ(){


  var request = {
    location: center,
    radius: '500',
    query: locs[il+1]
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);


}
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


getLocs();
initialize()
  function marker(){
    for (var i = 0; i < coords.length; i++) {
      var marker = new google.maps.Marker({
        position: coords[i],
        map: map,
        title: coords[i]
      })
    }
  }
  myLoop();
