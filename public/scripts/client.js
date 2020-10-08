/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  
  // Function in preventing XSS attacks/unwanted code injection  

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

  // Takes in a tweet object, return a tweet <article> element containing HTML structure of the tweet

  const createTweetElement = function(tweetData) {
    let $tweet = $(`
    <article>
      <header>
        <div>
          <span>
          <img src="${tweetData.user.avatars}">
          ${tweetData.user.name}
          </span>
          ${tweetData.user.handle}
        </div>
      </header class="tweet-head">
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <p class="tweeter-days">${moment(tweetData.created_at).fromNow()}</p>
        <div class="tweeter-icons">
          <img src="/images/icons8-flag.png">
          <img src="/images/icons8-like.png">
          <img src="/images/icons8-retweet.png">
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  };


  // Function, empties element, then takes in an array of tweet objects of (tweetData), and insert it in #tweets-container inside the <section> HTML element

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };
  

  // Function responsible for loading/fetching tweets from /tweets/ page

  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET'
    })
      .then(function(twts) {
        renderTweets(twts);
      });
  };

  loadTweets();
  

  // Compose and submit a tweet less than or equal to 140 characters. Returns an error when more than 140 characters or an empty value 

  $('form').on('submit', function(event) {
    event.preventDefault();           // Stops the default action of the element 'submit'
    const data = $(this).serialize(); // Turns the form data into a query string
    const tweetData = $('#textarea-tweet').val();

    if (tweetData.length === 0) {
      $('.error-message').empty();
      $('.error-message').slideDown('slow', function() {
        $('.error-message').html(`<img src="/images/icons8-error.png"> Empty tweet? Please share your thoughts! <img src="/images/icons8-error.png">`);
        $('.error-message').delay(4000).slideUp(500);
      });
    } else if (tweetData.length > 140) {
      $('.error-message').empty();
      $('.error-message').slideDown('slow', function() {
        $('.error-message').html(`<img src="/images/icons8-error.png"> Sorry, maximum character limit exceeded. <img src="/images/icons8-error.png">`);
        $('.error-message').delay(4000).slideUp(500);

        $('#textarea-tweet').val('');          // Clears textarea
        $('.counter').text(140);               // Resets counter
        $('.counter').css("color", "#545149"); // Returns counter color to default
      });
    } else {
      $('.error-message').slideUp('slow');
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data
      })
        .then(function() {
          $('#textarea-tweet').val('');   // Clears textarea
          $('.counter').text(140);        // Resets counter
          loadTweets();
          $('.new-tweet').slideToggle();
        });
    }
  });


  // Compose a tweet toggle

  $('.new-tweet-nav').on('click', function() {
    $('.new-tweet').slideToggle();
  });

});