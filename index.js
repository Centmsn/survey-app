const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
// passportConfig does not return anything
require("./services/passport");
const authRoutes = require("./routes/auth");

const app = express();

app.use(authRoutes);

mongoose.connect(
  keys.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT || 5000);
  }
);
