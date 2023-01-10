const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/:quotes', (req, res, send) => {
  let foundQuotes = quotes.filter(quote => quote.person == req.query.person);
  if (foundQuotes) {
    let body = {
      quotes: foundQuotes
    };
    res.send(body);
  } else {
    res.status(404).send();
  }
});

app.get('/api/quotes', (req, res, send)=> {
  let body = {
    quotes: quotes
  };
  res.send(body);
});

app.get('/api/quotes/random', (req, res, send) => {
  let randomQuote = getRandomElement(quotes);
  if (randomQuote) {
    let body = {
      quote: randomQuote
    };
    res.send(body);
  } else {
    res.status(404).send();
  }
});

app.post('/api/quotes', (req, res, send) => {
  if (req.query.quote && req.query.person) {
    let newQuote = {
      quote: req.query.quote,
      person: req.query.person
    };
    quotes.push(newQuote);
    res.send({quote: newQuote});
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
