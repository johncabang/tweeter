$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    let counter = 140;
    let length = $(this).val().length;
    $(".counter").text(counter - length);
    if (counter < length) {
      $(".counter").css("color", "#FF0000") 
    } else {
      $(".counter").css("color", "#545149");
    }
  })
}); 