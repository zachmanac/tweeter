/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetList = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
  ];

  const renderTweets = function(tweetList) {
    // loops through tweets
    for(const tweet of tweetList) {
      // calls createTweetElement for each tweet
      const $tweet = $createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.tweet-section').append($tweet);
    }
  };

  const $createTweetElement = function (tweetData) {

    const tweet = `
    <article class="tweet-container">
    <header>
      <div>
      <h2><img src="${tweetData.user.avatars}" alt="${tweetData.user.name}'s Profile picture"></h2>
      <h2>${tweetData.user.name}</h2>
      </div>
      <h4>${tweetData.user.handle}</h4>
    </header>
    <p>${tweetData.content.text}
    </p>
    <footer>
      <p>${tweetData.created_at}</p>
      <div>
        <p>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </p>
      </div>
    </footer>
    </article>
    `
    return tweet;
    };

  renderTweets(tweetList);

});