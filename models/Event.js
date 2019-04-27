var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const eventImageList = require("../helpers/defaultEventImageList")

function randomEventImage (){
  let i = eventImageList.length
  let rand = Math.floor(Math.random() * i)
 return eventImageList[rand];
};

var EventSchema = new Schema({
  eventImage:{
    type: String,
    default: randomEventImage
  },
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  place: {
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// This creates our model from the above schema, using mongoose's model method
var Event = mongoose.model("Event", EventSchema);

// Export the Note model
module.exports = Event;