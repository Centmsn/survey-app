const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {
    type: String,
  },
  credits: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", userSchema);
