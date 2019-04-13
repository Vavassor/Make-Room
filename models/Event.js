var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  attendees: [
    {
    type: String
  }
],
});

// This creates our model from the above schema, using mongoose's model method
var Event = mongoose.model("Event", EventSchema);

// Export the Note model
module.exports = Event;