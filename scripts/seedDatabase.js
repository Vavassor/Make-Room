const mongoose = require("mongoose");
const models = require("../models");

const bcrypt = require("bcrypt-nodejs");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const userSeeds = [
  {
    _id: mongoose.Types.ObjectId("5cb36af71767efad3f77a128"),
    username: "vavassor",
    firstname: "Andrew",
    lastname: "Dawson",
    blurb: "Howdy!",
    email: "dawso.andrew@gmail.com",
    website: "https://vavassor.github.io",
    password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
  },
  {
    _id: mongoose.Types.ObjectId("5cb36af71767bf1ef77a128a"),
    username: "Scooter",
    password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
    firstname: "Scott",
    lastname: "Zinski",
    blurb: "Headstrong - willing to learn just about anything",
    email: "Scott@zinski.net",
    socialMediaHandles: {
      twitter: "twitterme.com",
      github: "github.com",
      facebook: "facebook.com"
    },
  }
];

models.User
  .deleteMany({})
  .then(() => models.User.collection.insertMany(userSeeds))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });