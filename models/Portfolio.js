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
    order: {
      type: Date,
      default: Date.now,
      required: false
    },
    url: 
    {type: String,
      required: false,
      default: "./images/default-item.png"
    },
    title: {
      type: String,
      default: "New Item"
    },
    about: {
      type: String,
      default: "Porfolio Item Info"
    }
  }
],
  porfolioaDisplayType: {
    type: String,
    required: false,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;

