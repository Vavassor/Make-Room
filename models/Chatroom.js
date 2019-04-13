var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Chatroomschema = new Schema({
rooms: []
});

// This creates our model from the above schema, using mongoose's model method
var Chatroom = mongoose.model("Chatroom", Chatroomschema);

// Export the Note model
module.exports = Chatroom;