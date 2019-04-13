const models = require("../models");

function handleError(error, response) {
  response.status(500).json(error);
}

module.exports = {
  create: function(request, response) {
    models.User
      .create(request.body)
      .then(user => response.json(user))
      .catch(error => handleError(error, response));
  },

  getSelf: function(request, response) {
    const user = request.user;
    const data = {
      id: user._id,
      username: user.username,
    };
    response.json(data);
  },
};