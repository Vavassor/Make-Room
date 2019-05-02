const aws = require("aws-sdk");
const generateFileName = require("../helpers/FilenameGenerator");
const googleMaps = require("@google/maps");
const models = require("../models");

require("dotenv").config();

const googleMapsClient = googleMaps.createClient({
  key: "AIzaSyCKqyLfb3rmO6CPk4Fl3mBhXCdkbl-zHK4",
  Promise: Promise,
});

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = "us-east-1";

module.exports = {
  attendEvent: function(request, response, next) {
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
      .catch(next);
  },

  createEvent: function(request, response, next) {
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
      .catch(next);
  },
  
  deleteEvent: function(request, response, next) {
    models.Event
      .deleteOne({_id: request.params.id})
      .then(event => response.json(event))
      .catch(next);
  },

  getAllEvents: function(request, response, next) {
    let query = models.Event.find();

    if (request.query["after_time"]) {
      const startTime = request.query["after_time"];
      query = query.where("startTime").gte(startTime);
    }

    if (request.query["order_by"]) {
      const orderBy = request.query["order_by"].split(":");
      const key = orderBy[0];
      let direction = 1;
      if (orderBy.length > 1) {
        if (orderBy[1] === "asc") {
          direction = 1;
        }
        if (orderBy[1] === "desc") {
          direction = -1;
        }
      }
      query = query.sort({[key]: direction});
    }
  
    query
      .then(events => response.json(events))
      .catch(next);
  },

  getEventById: function(request, response, next) {
    models.Event
      .findById(request.params.id)
      .populate("attendees", "-password")
      .then(event => response.json(event))
      .catch(next);
  },

  stopAttendingEvent: function(request, response, next) {
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
      .catch(next);
  },

  updateEvent: function(request, response, next) {
    const update = (request) => {
      const event = request.body;

      event.place = {
        address: event.placeAddress,
        name: event.placeName,
      };
      delete event.placeAddress;
      delete event.placeName;
      delete event.file;
    
      googleMapsClient
        .geocode({address: event.place.address})
        .asPromise()
        .then((response) => {
          if (response.json.status !== "OK") {
            throw new Error("Google maps did not find the address.");
          }
  
          const firstResult = response.json.results[0];
          event.place.address = firstResult.formatted_address;
  
          const location = firstResult.geometry.location;
          event.place.position = {
            latitude: location.lat,
            longitude: location.lng,
          };
  
          return models.Event.findOneAndUpdate(
            {
              _id: request.params.id,
              creator: request.user._id,
            },
            event
          );
        })
        .then((event) => {
          if (!event) {
            throw new Error("The event was not found or the authenticated user wasn't its creator.");
          }
          response.json(event);
        })
        .catch(next);
    };

    if (request.file) {
      const fileName = generateFileName(request.file.originalname);

      const s3 = new aws.S3();
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        ContentType: request.file.mimetype,
        ACL: "public-read",
        Body: request.file.buffer,
      };
  
      s3.putObject(s3Params, (error, data) => {
        if (error) {
          throw error;
        }
        const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
        request.body.eventImage = url;
        update(request);
      });
    } else {
      update(request);
    }
  },
};