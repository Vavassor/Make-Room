const mongoose = require("mongoose");
const models = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

models.User
  .findOne({username: "vavassor"});

const eventSeeds = [
  {
    name: "April Meetup",
    startTime: new Date("2019-04-17T17:30:00-05:00"),
    endTime: new Date("2019-04-17T18:30:00-05:00"),
    address: "2707 E Marshall St, Richmond, VA 23223",
    placeName: "WPA Bakery",
    description: "no description",
    creator: "awefoij2308238253",
  },
  {
    name: "OTR Spring Fling",
    startTime: new Date("2019-04-28T09:00:00-05:00"),
    endTime: new Date("2019-04-29T12:00:00-05:00"),
    address: "2620 Buford Rd, Richmond, VA 23235",
    placeName: "Perk Bon Air",
    description: "no description",
    creator: "awefoij2308238253",
  },
];

models.Event
  .deleteMany({})
  .then(() => models.Event.collection.insertMany(eventSeeds))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });