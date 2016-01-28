
function getTweets(address){
  var getter = $.ajax({
  url: "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=prettylights&count=2",
  method: "GET",
  dataType: "json"
});
getter.done(function(response){
  console.log(response);
});
};
