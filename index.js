const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookiesSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth");
const billingRoutes = require("./routes/billing");
// passportConfig does not return anything
require("./models/user");
require("./services/passport");

const app = express();

app.use(bodyParser.json());

app.use(
  cookiesSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(billingRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect(
  keys.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(process.env.PORT || 5000);
  }
);
