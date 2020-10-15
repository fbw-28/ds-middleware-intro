const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())

const logBody = (req, res, next) => {
  console.log(req.body)
  next()
}

app.get('/getme', (req, res) => {
  res.json({})
});

app.post('/postme', logBody, (req, res) => {
  res.json({})
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.