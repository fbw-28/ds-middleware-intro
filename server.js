const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const bodyLogger = (req, res, next) => {
  console.log(req.body);
  next();
};
const fullName = (req, res, next) => {
  const { firstname, lastname } = req.body;
  if (firstname && lastname) {
    res.locals.fullname = firstname + " " + lastname;
  }
  next();
};

app.get("/getme", (req, res) => {
  res.json({});
});

app.post("/postme", bodyLogger, fullName, (req, res) => {
  const { fullname } = res.locals;
  if (fullname) {
    console.log("fullname: " + fullname);
  }
  res.json({});
});

app.listen(5000, () => {
  console.log("Example app listening on port 5000!");
});

//Run app, then load http://localhost:5000 in a browser to see the output.
