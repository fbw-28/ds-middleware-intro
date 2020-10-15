const express = require('express');
const app = express();
const morgan = require("morgan");

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Custom Middlewares
const setPostMiddleware = (req,res,next)=>{
  console.log(req.body)
  next();
}

const getFullName = (req,res,next)=>{

  // Destructuring body fields
  const {firstName, lastName} = req.body;

  // Checking for Errors
  // Case both fields are missing
  if( !firstName && !lastName){
    res.json({"error":"First and Last Name are required fields!"});
    return;

  } else if(!firstName){
    // case firstname is missing
    res.json({"error": "First Name is required!"});
    return;
  } else if(!lastName){
    //case lastname is missing
    res.json({"error": "Last Name is required!"});
    return;
  }

  // in case of null errors, this script runs
    const fullName = `${firstName} ${lastName}`;
    req.body.fullName = fullName;
    console.log("Response from Middleware:",fullName)
    next();
  
}

//routes
app.get('/getme', (req, res) => {
  res.json({})
});

app.post('/postme', setPostMiddleware, getFullName, (req, res) => {
  const {fullName} = req.body;
  console.log(`Response from ${req.url}: ${fullName}`)
  res.json({"fullName": fullName})
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});

//Run app, then load http://localhost:5000 in a browser to see the output.