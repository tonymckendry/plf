console.log("This Works")

var hue

$(".hue").mouseenter(function(){
  hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ','
                 + (Math.floor((256-199)*Math.random()) + 200) + ','
                 + (Math.floor((256-199)*Math.random()) + 200) + ')';
  // $(this).animate({backgroundColor: "#aa0000"}, 500);
  $(this).css("background-color", hue)
})

$("div").mouseleave(function(){
  $(this).css({"background-color": "white"}, 500)
})
