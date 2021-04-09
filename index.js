const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send({ message: "Hello there" });
});

app.listen(process.env.PORT || 5000);
