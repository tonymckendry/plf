function hueMaker(){
  var rand = Math.round((Math.random() * 4))
  if (rand > 3){
    // var a = Math.round((Math.random() * 3 + 1) * 50)
    // var b = 255
    var a = 0
    var b = 126
    var c = 255
  }
  else if (rand > 2){
    var a = 255
    var b = 0
    var c = 126
    // var b = 255
    // var c = Math.round((Math.random() * 3 + 1) * 50)
  }
  else if (rand > 1) {
    var a = 0
    var b = 255
    var c = 126
    // var a = 255
    // var b = Math.round((Math.random() * 3 + 1) * 50)
    // var c = 255
  }

  else {
    var a = 255
    var b = 255
    var c = 126
  }
  return 'rgb(' + (Math.floor((256-199)*Math.random()) + a) + ','
                 + (Math.floor((256-199)*Math.random()) + b) + ','
                 + (Math.floor((256-199)*Math.random()) + c) + ')';
}

$(".hue").mouseenter(function(){
  var hue = hueMaker()
  // $(this).animate({backgroundColor: "#aa0000"}, 500);
  $(this).css("background-color", hue)
})

$(".hue").mouseleave(function(){
  $(this).css({"background": "transparent"}, 2000)
})

$("#drop li").mouseenter(function(){
  var hue = hueMaker()
  $(this).css("color", hue)
})
$("#drop li").mouseleave(function(){
  $(this).css("color", "black")
})
