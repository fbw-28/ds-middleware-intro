const express = require('express');
const app = express();
const morgan = require("morgan");

app.use( morgan('dev') );

app.use(express.json());

app.get('/getme', (req, res) => {
  res.json({})
});


const checkBody = (req, res, next) => {
  console.log(req.body);
  next();
}

app.post('/postme',checkBody, (req, res) => {
  res.json({message: "Hello ckeckBody"})
});


app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.