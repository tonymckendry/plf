function hueMaker(){
  var rand = Math.round((Math.random() * 12))
  if (rand > 12){
    // var a = Math.round((Math.random() * 3 + 1) * 50)
    // var b = 255
    var a = 0
    var b = 126
    var c = 255
  }
  else if (rand > 11){
    var a = 255
    var b = 0
    var c = 126
    // var b = 255
    // var c = Math.round((Math.random() * 3 + 1) * 50)
  }
  else if (rand > 10) {
    var a = 0
    var b = 255
    var c = 126
    // var a = 255
    // var b = Math.round((Math.random() * 3 + 1) * 50)
    // var c = 255
  }

  else if (rand > 9){
    var a = 255
    var b = 255
    var c = 126
  }
  else if (rand > 8){
    var a = 255
    var b = 126
    var c = 255
  }
  else if (rand > 7){
    var a = 126
    var b = 255
    var c = 225
  }
  else if (rand > 6){
    var a = 255
    var b = 126
    var c = 126
  }
  else if (rand > 5){
    var a = 126
    var b = 126
    var c = 255
  }
  else if (rand > 4){
    var a = 126
    var b = 255
    var c = 126
  }
  else if (rand > 3){
    var a = 255
    var b = 0
    var c = 0
  }
  else if (rand > 2){
    var a = 0
    var b = 0
    var c = 255
  }
  else {
    var a = 0
    var b = 255
    var c = 0
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
