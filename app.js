// require local dependency
const express = require('express');
const morgan = require('morgan');

// creates object to communicate with express server
const app = express();

// Drill 1
app.get('/sum', (req,res) => {
  const query = req.query;
  // convert parameters to numbers and add
  const sum = Number(query.a) + Number(query.b);
  res.send(`The sum of ${query.a} and ${query.b} is ${sum}`);
});

// Drill 2 - Caesar Cipher
app.get('/cipher', (req, res) => {
  // Store text as array for each char
  const text = req.query.text.split('');
  // Convert to number and store
  const shift = Number(req.query.shift);
  // For each char, gets the string of the char code after shifted
  const shiftedText = text.map(char => {
    const num = char.charCodeAt(0) + shift;
    return String.fromCharCode(num);
  });
  // Send response as a string
  res.send(`Your cipher text is: ${shiftedText.join('')}`);
});

// Drill 3
app.get('/lotto', (req, res) => {
  const lotto = req.query.numbers;
  // Checks that 6 numbers are given
  if(lotto.length !== 6) {
    res.status(400).send('Bad Request, Please provide 6 numbers');
  }
  // Checks that number is between 1-20
  const validNum = lotto.filter(num => num >= 1 && num <= 20);
  if(validNum.length !== 6) {
    res.status(406).send('Bad Request, number has to be between 1 and 20');
  }
  // Generates lotto key with 6 random generated num from 1-20
  const lottoKey = [];
  while (lottoKey.length < 6) {
    lottoKey.push(Math.round(Math.random() * 20).toString());
  }
  // Compares user lotto to key
  const matchingNum = lotto.filter(num => lottoKey.includes(num));
  
  // Results
  switch(matchingNum.length) {
  case 1:
  case 2:
  case 3:
    res.send('Sorry, you lose');
    break;
  case 4:
    res.send('Congratulations, you win a free ticket');
    break;
  case 5: 
    res.send('Congratulations! You win $100!');
    break;
  case 6:
    res.send('Wow! Unbelievable! You could have won the mega millions!');
    break;
  default:
    break;
  }
});

// enable requests on port 8000
app.listen(8000, () => {
  console.log('Express server is listening on port 8000');
});