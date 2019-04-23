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
  {
    userId: mongoose.Types.ObjectId("5cb36af71767efad3f77a128"),
    portfolioDetails: "",
    images: [
      {
        "title" : "Aquarium Hallway",
        "about" : "ITEM",
        "order" : new Date("2019-04-23T22:45:18.870Z"),
        "url" : "https://66.media.tumblr.com/34d2ed53f8b0a499f75fd948d6ea0c68/tumblr_nd9fxjkgij1r1qohho1_1280.jpg"
      }, 
      {
        "title" : "Flow Mapping",
        "about" : "Made with flow map painter! http://teckartist.com/?page_id=107",
        "order" : new Date("2019-04-23T22:47:25.277Z"),
        "url" : "https://66.media.tumblr.com/42e686b366f9eeb688b21567d3eb7eb2/tumblr_mgtcgo8AJB1r1qohho1_640.pnj"
      }, 
      {
        "title" : "Icosa",
        "about" : "Made in Icosa by Andi McClure https://data.runhello.com/j/iso/post/",
        "order" : new Date("2019-04-23T22:48:52.429Z"),
        "url" : "https://66.media.tumblr.com/f67108c33c301d7ab8fd33d4049a2307/tumblr_n9gbiaJUcX1r1qohho6_1280.png"
      }, 
      {
        "title" : "Bird!",
        "about" : "Bird!",
        "order" : new Date("2019-04-23T22:50:43.471Z"),
        "url" : "https://66.media.tumblr.com/e5a066d469b500e995ebd4cf23ffca6e/tumblr_n7g46kbJk51r1qohho1_1280.png"
      }, 
      {
        "title" : "Luray Caverns",
        "about" : "It's surprisingly tall",
        "order" : new Date("2019-04-23T22:52:45.673Z"),
        "url" : "https://66.media.tumblr.com/69563e294a7714923d4c8bb7af465ba6/tumblr_nssnkhyu9g1r1qohho1_1280.jpg"
      }, 
      {
        "title" : "Obsidian",
        "about" : "West shore",
        "order" : new Date("2019-04-23T22:53:10.406Z"),
        "url" : "https://66.media.tumblr.com/b5e5223b75abd91180c9d45ff89c7cb1/tumblr_nttok71mnu1r1qohho1_1280.pnj"
      }, 
      {
        "title" : "Remix #4",
        "about" : "",
        "order" : new Date("2019-04-23T22:55:13.127Z"),
        "url" : "https://66.media.tumblr.com/ce218e5759d06efa105d580894a8fb71/tumblr_mvz13enN1W1r1qohho1_1280.pnj"
      }, 
      {
        "title" : "Marl",
        "about" : "Inner chamber",
        "order" : new Date("2019-04-23T22:57:19.091Z"),
        "url" : "https://66.media.tumblr.com/69a4b5a5877743e9421f1ec31e3a8cc0/tumblr_nehem2q8yx1r1qohho1_1280.png"
      }
    ],
  },
];

models.Portfolio
  .deleteMany({})
  .then(() => models.Portfolio.insertMany(portfolioSeeds))
  .then(data => {
    console.log("Data: ", data)
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });