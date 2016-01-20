var addSong = document.getElementById('addSong')
var songForm = document.getElementById('songForm')

var i = 2;
$(addSong).on('click', function(){
  // $(songForm).append('div#setSong')
  console.log("working");
  $(songForm).append($.jade(
    'div#setSong' + i
  ))
  $('#setSong' + i).append($.jade(
    'p#' + i
  ))
  $('p#' + i).append($.jade(
    'label.newLabel(for="song' + i + '") Song ' + i
  ))
  $('p#' + i).append($.jade(
    'input.newSet(name="song' + i + '")'
  ))
  $('p#' + i).append($.jade(
    'label.newLabel(for="notes' + i + '") Notes'
  ))
  $('p#' + i).append($.jade(
    'input.newSet(name="notes' + i + '")'
  ))
  $('p#' + i).append($.jade(
    'img.tranArrow#ta' + i + '(src="/images/tranArrow.png")'
  ))
  $('p#' + i).append($.jade(
    'input(type="checkbox" name="ta'+ i +'")'
  ))
  i++
})
