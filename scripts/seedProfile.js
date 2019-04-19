const mongoose = require("mongoose");
const models = require("../models");

// const bcrypt = require("bcrypt-nodejs");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const portfolioSeeds = [
  {
    userId: "5cb36af71767bf1ef77a128a",
    portfolioDetails: "This is my portfolio.  There are many like it, but this one is mine! ",
    images: [
      {
        imageId: ,
        url: "https://s.abcnews.com/images/Lifestyle/BR_snail_frog_jef_160825_3x2_1600.jpg",
        title: "Love this Frog and Snail",
        about: "Frog and Snail, best freinds for life.  ",
      },
      {
        url: "http://4.bp.blogspot.com/_DDc07JYdn5w/RcB0fuJ7crI/AAAAAAAAACk/uNc85MX2la0/s400/frosch.jpg",
        title: "This is my best work yet!",
        about: "I spent forever trying to get this hampster on this frog.  Finally they cooperated!",
      },
      {
        url: "https://s.abcnews.com/images/Lifestyle/BR_snail_frog_jef_160825_3x2_1600.jpg",
        title: "This is my best work yet!",
        about: "I spent forever trying to get this hampster on this frog.  Finally they cooperated!",
      },
    ]
  },

];

models.Portfolio
  .deleteMany({})
  .then(() => models.Portfolio.collection.insertMany(portfolioSeeds))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });