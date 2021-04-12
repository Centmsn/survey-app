const express = require("express");
const mongoose = require("mongoose");
const cookiesSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
// passportConfig does not return anything
require("./models/user");
require("./services/passport");

const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cookiesSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

mongoose.connect(
  keys.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT || 5000);
  }
);
