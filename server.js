const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev")); // morgan middleware

app.use(express.json()); // body parser middleware

// middleware for the body of incoming requests
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

//middleware for fullName
const fullNameMiddleware = (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (firstName && lastName) {
    res.locals.fullName = firstName + " " + lastName;
    next();
  } else {
    res.send({ error: "the required fields are not fullfilled" });
  }
};

app.get("/getme", (req, res) => {
  res.json({});
});

app.post("/postme", fullNameMiddleware, (req, res) => {
  res.json(res.locals.fullName);
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

//Run app, then load http://localhost:5000 in a browser to see the output.
