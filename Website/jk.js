const quoteEl = document.getElementById('quote');
const btn = document.getElementById('new-quote');

const QuotesAPI = {
  quotes: [
    { text: "Dream big, start small, act now.", author: "Anonymous" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Mistakes are proof that you are trying.", author: "Unknown" },
    { text: "Hustle in silence, let your success be the noise.", author: "Frank Ocean" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "Life is short, make every selfie count.", author: "Internet Wisdom" },
    { text: "Code, coffee, repeat.", author: "Programmer Life" },
    { text: "Be a voice, not an echo.", author: "Unknown" },
    { text: "Adventure is out there!", author: "Up" }
  ],

  fetchQuote: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        resolve(this.quotes[randomIndex]);
      }, 200);
    });
  }
};

function getQuote() {
  quoteEl.style.opacity = 0;
  QuotesAPI.fetchQuote()
    .then(quote => {
      setTimeout(() => {
        quoteEl.innerText = `"${quote.text}" — ${quote.author}`;
        quoteEl.style.opacity = 1;
      }, 200);
    })
    .catch(err => {
      quoteEl.innerText = "Oops! Could not fetch quote.";
      console.error(err);
    });
}

getQuote();

btn.addEventListener('click', getQuote);
