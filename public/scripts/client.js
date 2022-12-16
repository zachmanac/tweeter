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
    
    if (tweetData.content.text.length > 140) {
      return alert("Tweet too long.");
    }

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
      return alert("Tweet length too long!");
    }
    
    if($("textarea").val().length == 0) {
      return alert("Must input text to tweet!");
    }

    const data = $("form").serialize();
    // console.log("data string", $("textarea").val());

    //clears text input field after submission
    $("textarea").val();

    $.post("/tweets", data, (response) => {
      console.log(response);
      loadTweets();
    });
  });
});

