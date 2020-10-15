const express = require('express');
const app = express();

//Install express and morgan please (in one go: `npm i express morgan`)
const morgan = require("morgan")

app.use( express.json() ) // JSON body parser middleware into req.body (oject)

app.use( morgan('dev') ) // setup morgan request logger middleware

/** MIDDLEWARE (generic) run one every route*/
 app.use( (req, res, next) => {
   let isbodyEmpty=Object.keys(req.body).length>0 //how to check if the body is empty
   if (isbodyEmpty){
    console.log("body:", req.body)
   }
  
  next()
 })



app.get('/getme', (req, res) => {
  res.json({message: 'get me'})
});

app.post('/postme', (req, res) => {
  res.json({message: 'post me'})
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.