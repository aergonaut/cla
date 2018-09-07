const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AgreementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  githubLogin: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Agreement", AgreementSchema);
