const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
