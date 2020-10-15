const express = require('express');
const app = express();
const morgan = require("morgan")

app.use( morgan('dev') ) // register morgan middleware!

app.use( express.json() ) // => parse incoming JSON string into req.body (object)

/** MIDDLEWARE (generic)  => runs on every call to any route
 * 
 * Logs for me the body, if one exists
*/
app.use( (req, res, next) => {
  let isBodyEmpty = Object.keys( req.body ).length > 0

  if(isBodyEmpty) {
    console.log("[Middleware] Body scan: ",  req.body)
  }
  next()
})

app.get('/getme', (req, res) => {
  res.json({ message: "Hello" })
});

app.post('/postme', (req, res) => {
  res.json(req.body)
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.