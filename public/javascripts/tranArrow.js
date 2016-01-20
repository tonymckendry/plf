$(document).on("click", '.tranArrow', function(){
  if ($(this).attr('src') == '/images/tranArrow.png'){
    $(this).prop('src', '/images/tranArrowchecked.png')
    $(document.getElementsByName(($(this).attr('id')))).prop('checked', 'true')
  }
  else if ($(this).attr('src') == '/images/tranArrowchecked.png'){
    $(this).prop('src', '/images/tranArrow.png')
    $(document.getElementsByName(($(this).attr('id')))).removeAttr('checked')
  }
})


// $(document.getElementsByClassName('tranArrow')).on('click', function(){
//   if ($(this).attr('src') == '/images/tranArrow.png'){
//     $(this).prop('src', '/images/tranArrowchecked.png')
//     $(document.getElementsByName(($(this).attr('id')))).prop('checked', 'true')
//   }
//   else if ($(this).attr('src') == '/images/tranArrowchecked.png'){
//     $(this).prop('src', '/images/tranArrow.png')
//     $(document.getElementsByName(($(this).attr('id')))).removeAttr('checked')
//   }
// })
