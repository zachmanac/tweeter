/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    $('.tweet-section').empty();
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = $createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $('.tweet-section').prepend($tweet);
    }
  };

  const $createTweetElement = function(tweetData) {

    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const tweet = `
      <article class="tweet-container">
      <header>
        <div>
        <h2><img src="${tweetData.user.avatars}" alt="${tweetData.user.name}'s Profile picture"></h2>
        <h2>${tweetData.user.name}</h2>
        </div>
        <h4>${tweetData.user.handle}</h4>
      </header>
      <p>${escape(tweetData.content.text)}
      </p>
      <footer>
        <p>${timeago.format(tweetData.created_at)}</p>
        <div>
          <p>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </p>
        </div>
      </footer>
      </article>
      `;
    return tweet;
  };

  const loadTweets = () => {
    $.get("/tweets", (tweets) => {
      (renderTweets(tweets));
    });
  };

  loadTweets();

  $("form").on("submit", (event) => {
    event.preventDefault();
    
    if($("textarea").val().length > 140) {
      return $("#error-new-tweet").slideDown("slow");
    }
    
    if($("textarea").val().length === 0) {
      return $("#error-new-tweet").slideDown("slow");
    }

    $("#error-new-tweet").slideUp("slow");

    const data = $("form").serialize();

    //clears text input field after submission
    $("textarea").val("");
    $("output").val(140);

    $.post("/tweets", data, (response) => {
      console.log(response);
      loadTweets();
    });
  });
});