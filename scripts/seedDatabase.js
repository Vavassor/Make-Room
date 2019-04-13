const mongoose = require("mongoose");
const models = require("../models");

const bcrypt = require("bcrypt-nodejs");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const userSeeds = [
  {
    username: "vavassor",
    password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
  },
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