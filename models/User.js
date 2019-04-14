const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false
  },
  email: {
    type: String,
    requried: false
  },
  socialMediaHandles: {
    type: Map,
    of: String
  },
  // events: [],
  portfolio: { 
    type: Schema.Types.ObjectId, 
    ref: 'Porftolio' 
  },
  joined: {
    date: { type: Date, default: Date.now },
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;