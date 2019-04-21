const models = require("../models");
const googleMaps = require("@google/maps");

const googleMapsClient = googleMaps.createClient({
  key: "AIzaSyCKqyLfb3rmO6CPk4Fl3mBhXCdkbl-zHK4",
  Promise: Promise,
});

module.exports = {
  attendEvent: function(request, response) {
    models.Event
      .findByIdAndUpdate(
        request.params.id,
        {
          $addToSet: {
            attendees: request.user._id,
          },
        }
      )
      .then(event => response.json(event))
      .catch(error => response.status(422).json(error));
  },

  createEvent: function(request, response) {
    const event = request.body;
    event.creator = request.user._id;
    event.attendees = [event.creator];

    googleMapsClient
      .geocode({address: event.place.address})
      .asPromise()
      .then((response) => {
        if (response.json.status !== "OK") {
          throw new Error("Google maps did not find the address.");
        }

        const firstResult = response.json.results[0];
        event.address = firstResult.formatted_address;

        const location = firstResult.geometry.location;
        event.place.position = {
          latitude: location.lat,
          longitude: location.lng,
        };

        return models.Event.create(event);
      })
      .then(event => response.json(event))
      .catch(error => response.status(422).json(error));
  },
  
  deleteEvent: function(request, response) {
    models.Event
      .deleteOne({_id: request.params.id})
      .then(event => response.json(event))
      .catch(error => response.status(422).json(error));
  },

  getAllEvents: function(request, response) {
    let query = models.Event.find();

    if (request.query["order_by"]) {
      const orderBy = request.query["order_by"].split(":");
      const key = orderBy[0];
      let direction = "+";
      if (orderBy.length > 1) {
        if (orderBy[1] === "asc") {
          direction = "+";
        }
        if (orderBy[1] === "desc") {
          direction = "-";
        }
      }
      query = query.sort(direction + key);
    }
  
    if (request.query["after_time"]) {
      const startTime = request.query["after_time"];
      query = query.where("startTime").gte(startTime);
    }
  
    query
      .then(events => response.json(events))
      .catch(error => response.status(422).json(error));
  },

  getEventById: function(request, response) {
    models.Event
      .findById(request.params.id)
      .populate("attendees", "-password")
      .then(event => response.json(event))
      .catch(error => response.status(422).json(error));
  },

  stopAttendingEvent: function(request, response) {
    models.Event
      .updateOne(
        {
          _id: request.params.id,
        },
        {
          $pull: {
            attendees: request.user._id,
          },
        }
      )
      .then(updateResponse => response.status(204).end())
      .catch(error => response.status(500).json(error));
  },

  updateEvent: function(request, response) {
    const event = request.body;
    
    googleMapsClient
      .geocode({address: event.place.address})
      .asPromise()
      .then((response) => {
        if (response.json.status !== "OK") {
          throw new Error("Google maps did not find the address.");
        }

        const firstResult = response.json.results[0];
        event.address = firstResult.formatted_address;

        const location = firstResult.geometry.location;
        event.place.position = {
          latitude: location.lat,
          longitude: location.lng,
        };

        return models.Event
          .findOneAndUpdate({_id: request.params.id}, event);
      })
      .then(event => response.json(event))
      .catch(error => response.status(422).json(error));
  },
};