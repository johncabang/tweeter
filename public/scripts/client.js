/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {


  // Fake data taken from initial-tweets.json

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


// Take in array of tweet objects of (tweetData), and insert it in #tweets-container inside the <section> HTML element

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      // console.log(tweet);
      // console.log(createTweetElement(tweet));
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };


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
      <p>${tweetData.content.text}</p>
      <footer>
        <p class="tweeter-days">10 Days Ago</p>
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

  renderTweets(tweetData);
  
  


  $('#tweet-text').on('submit', function(event) {
    event.preventDefault(); // Stops the default action of the element
  
    $.ajax({ 
      url: '/tweets/',
      method: 'POST', 
      data: $(this).serialize() // Turns the form data into a query string
    })
    .then(function() {
      console.log('Success');
    });

  })




});