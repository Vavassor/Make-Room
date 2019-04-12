const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  porfolioDetails: {
    type: String,
    required: false
  },
  images: [
    {
    url: String,
    about: String
  }
],
  porfolioaDisplayType: {
    type: String,
    required: true,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;