const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const checkGet = (req, res, next) => {
  console.log("validation process via MORGAN");
  next();
};

app.get("/getme", checkGet, (req, res) => {
  console.log("THIS IS GET ME ROUTE");
  res.json({
    message: "this is a GET",
  });
});

app.post("/postme", (req, res) => {
  res.json({
    message: "this is a POST",
  });
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

//Run app, then load http://localhost:5000 in a browser to see the output.
