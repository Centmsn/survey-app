const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = require("./recipient");

const surveySchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  subject: {
    type: String,
  },
  recipients: {
    type: [recipientSchema],
  },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  dateSent: {
    type: Date,
  },
  lastResponded: {
    type: Date,
  },
});

module.exports = mongoose.model("survey", surveySchema);
