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
  website: {
    type: String,
    required: false
  },
  socialMediaHandles: {
    type: Map,
    of: String
  },
  blurb: {
    type: String,
    required: false
  },
  portfolio: { 
    type: Schema.Types.ObjectId, 
    ref: 'Porftolio' 
  },
  joined: {
    type: Date, 
    default: Date.now,
    required: true
  },
  lastactive: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;