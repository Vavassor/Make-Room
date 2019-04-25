const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageList = require("../helpers/defaultImageList")

function randomImage (){
  let i = ImageList.length
  let rand = Math.floor(Math.random() * i)
 return ImageList[rand];
};

const portfolioSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  portfolioDetails: {
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
      default: randomImage
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
    default: "3::20",
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

module.exports = Portfolio;

