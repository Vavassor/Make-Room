const models = requestuire("../../models");

module.exports = {
  createEvent: function(request, response){
    models.Event
      .create(request.body)
      .then(response => response.json(response))
      .catch(error => response.status(422).json(error));
  },
  
  deleteEvent: function(request, response) {
    models.Event
      .deleteOne({_id: request.params.id})
      .then(response => response.json(response))
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
      .then((events) => {
        const responseEvents = events.map((event) => {
          const data = {
            address: event.address,
            id: event._id,
            name: event.name,
            placeName: event.placeName,
            startTime: event.startTime,
          };
          return data;
        });
        response.json(responseEvents);
      })
      .catch(error => response.status(422).json(error));
  },

  getEventById: function(request, response){
    models.Event
      .find({_id: request.params.id})
      .then(response => response.json(response))
      .catch(error => response.status(422).json(error));
  },

  updateEvent: function(request, response) {
    models.Event
      .findOneAndUpdate({_id: request.body.id})
      .then(response => response.json(response))
      .catch(error => response.status(422).json(error));
  },
};