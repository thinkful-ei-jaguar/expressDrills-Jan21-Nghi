// require local dependency
const express = require('express');
const morgan = require('morgan');

// creates object to communicate with express server
const app = express();

// Drill 1
app.get('/sum', (req,res) => {
  const {a, b} = req.query;
  // Data validation
  if(!a) {
    return res.status(400).send('a is required');
  }
  if(!b) {
    return res.status(400).send('b is required');
  }
  // Check if a and b are numbers
  if(Number.isNaN(a)) {
    return res.status(400).send('a must be a number');
  }
  if(Number.isNaN(b)) {
    return res.status(400).send('b must be a number');
  }

  // convert parameters to numbers and add
  const sum = Number(a) + Number(b);
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});

// Drill 2 - Caesar Cipher
app.get('/cipher', (req, res) => {
  // Store text as array for each char
  const text = req.query.text.split('');
  // Convert to number and store
  const shift = Number(req.query.shift);
  // Data validation
  if(!text) {
    return res.status(400).send('must provide text');
  }
  if(!shift) {
    return res.status(400).send('must provide shift');
  }
  if(Number.isNaN(shift)) {
    return res.status(400).send('shift must be a number');
  }
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