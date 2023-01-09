const form = document.querySelector('#tweet-form');
const tweetInput = document.querySelector('#tweet-text');
const usernameInput = document.querySelector('#username');

// Get newsfeed element
const newsfeed = document.querySelector('#newsfeed');

// Create empty array to store tweets
const tweets = [];

// Create tweet template
function createTweet(text, username) {
  // Create tweet element
  const tweet = document.createElement('div');
  tweet.classList.add('tweet');

  // Create username element
  const usernameElement = document.createElement('div');
  usernameElement.classList.add('username');
  usernameElement.textContent = username;

  // Create text element
  const textElement = document.createElement('div');
  textElement.classList.add('text');
  textElement.textContent = text;

  // Create actions element
  const actionsElement = document.createElement('div');
  actionsElement.classList.add('actions');

  // Create like button
  const likeButton = document.createElement('button');
  likeButton.classList.add('like');
  likeButton.addEventListener('click', () => {
    tweet.classList.toggle('liked');
  });

  // Create retweet button
  const retweetButton = document.createElement('button');
  retweetButton.classList.add('retweet');
  retweetButton.addEventListener('click', () => {
    newsfeed.prepend(tweet);
  });

  // Append elements to tweet element
  tweet.appendChild(usernameElement);
  tweet.appendChild(textElement);
  tweet.appendChild(actionsElement);
actionsElement.appendChild(retweetButton);

return tweet;
}

// Submit form event listener
form.addEventListener('submit', (event) => {
// Prevent form from reloading page
event.preventDefault();

// Get tweet text and username
const text = tweetInput.value;
const username = usernameInput.value;

// Create tweet element
const tweet = createTweet(text, username);

// Add tweet to newsfeed
newsfeed.prepend(tweet);

// Clear input values
tweetInput.value = '';
usernameInput.value = '';

// Add tweet to array
tweets.push({
text,
username
});

// Store tweets in local storage
localStorage.setItem('tweets', JSON.stringify(tweets));
});

// Get stored tweets from local storage
const storedTweets = JSON.parse(localStorage.getItem('tweets'));

// Add stored tweets to newsfeed
if (storedTweets) {
storedTweets.forEach((tweet) => {
const tweetElement = createTweet(tweet.text, tweet.username);
newsfeed.prepend(tweetElement);
});
}