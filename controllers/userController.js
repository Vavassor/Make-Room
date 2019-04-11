const models = require("../models");

function handleError(error, response) {
  response.status(500).json(error);
}

module.exports = {
  create: (request, response) => {
    models.User
      .create(request.body)
      .then(user => response.json(user))
      .catch(error => handleError(error, response));
  },
};