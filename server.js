const express = require('express');
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())

const logBody = (req, res, next) => {
  console.log(req.body)
  next()
}

const fullName = (req, res, next) => {
  if (!req.body.firstName && !req.body.lastName) return (res.json({message: 'oy div, send me proper data'}))
  const fullName = `${req.body.firstName} ${req.body.lastName}`
  req.body.fullName = fullName
  console.log(fullName)
  next()
}

app.get('/getme', (req, res) => {
  res.json({message: '/getme'})
});

app.post('/postme', fullName, logBody, (req, res) => {
  res.json({message: '/postme'})
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

