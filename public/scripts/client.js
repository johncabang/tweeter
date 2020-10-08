/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  
  // Take in a tweet object, return a tweet <article> element containing HTML structure of the tweet

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
        <p class="tweeter-days">${new Date(tweetData.created_at).toLocaleString()}</p>
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


  // Take in array of tweet objects of (tweetData), and insert it in #tweets-container inside the <section> HTML element

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      // console.log(tweet);
      // console.log(createTweetElement(tweet));
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
        console.log('loadTweets!');
      });
  };

  loadTweets();
  

  // Submit form using AJAX

  $('form').on('submit', function(event) {
    event.preventDefault(); // Stops the default action of the element 'submit'
    const data = $(this).serialize(); // Turns the form data into a query string
    const tweetData = $('#textarea-tweet').val();

    if (tweetData.length === 0) {
      $('.error-message').slideDown('slow', function() {
        $('.error-message').html(`<img src="/images/icons8-error.png"> Empty tweet?  Please share your thoughts! <img src="/images/icons8-error.png">`);
      });
    } else if (tweetData.length > 140) {
      $('.error-message').slideDown('slow', function() {
        $('.error-message').html(`<img src="/images/icons8-error.png"> Sorry, maximum character limit exceeded.. <img src="/images/icons8-error.png">`);
      });
    } else {
      $('.error-message').slideUp('slow');
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data
      })
        .then(function() {
          console.log('Success');
          $('#textarea-tweet').val(''); // Clears textarea
          $('.counter').text(140);      // Resets counter
          loadTweets();
          $('.new-tweet').slideToggle();
      });
    }
  });

  $('.new-tweet-nav').on('click', function() {
    $('.new-tweet').slideToggle();
  })


});