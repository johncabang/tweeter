$(document).ready(function() {
  $('#textarea-tweet').keyup(function() {
    let counter = 140;
    let length = $(this).val().length;
    
    $('.counter').text(counter - length);
    if (counter < length) {
      $('.counter').css("color", "#FF0000") 
    } else {
      $('.counter').css("color", "#545149");
    }
  })
      // $(this).nextAll('span').text(counter - length);
      // if (counter < length) {
      //   $(this).nextAll('span').css("color", "#FF0000") 
      // } else {
      //   $(this).nextAll('span').css("color", "#545149");
      // }
}); 


