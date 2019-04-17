const mongoose = require("mongoose");
const models = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

models.User
  .findOne({username: "vavassor"});

const eventSeeds = [
  {
    name: "April Meetup",
    startTime: new Date("2019-04-27T17:30:00-05:00"),
    endTime: new Date("2019-04-27T18:30:00-05:00"),
    place: {
      name: "WPA Bakery",
      address: "2707 E Marshall St, Richmond, VA 23223",
      position: {
        latitude: 37.5312401,
        longitude: -77.4183301,
      },
    },
    description: "no description",
    creator: "awefoij2308238253",
  },
  {
    name: "OTR Spring Fling",
    startTime: new Date("2019-04-28T09:00:00-05:00"),
    endTime: new Date("2019-04-29T12:00:00-05:00"),
    place: {
      name: "Perk Bon Air",
      address: "2620 Buford Rd, Richmond, VA 23235",
      position: {
        latitude: 37.534436,
        longitude: -77.562183,
      },
    },
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