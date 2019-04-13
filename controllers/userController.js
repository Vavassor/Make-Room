const models = require("../models");
const PasswordHelper = require("../helpers/PasswordHelper");

function handleError(error, response) {
  console.error(error);
  response.status(500).json(error);
}

module.exports = {
  create: function(request, response) {
    models.User
      .findOne({
        username: request.body.username,
      })
      .then((existingUser) => {
        if (existingUser) {
          return response.status(409).json({target: "username", error: "Username taken."});
        }
        if (!request.body.username.length) {
          return response.status(400).json({target: "username", error: "Invalid username."});
        }
        if (!request.body.password.length) {
          return response.status(400).json({target: "password", error: "Invalid password."});
        }
        return PasswordHelper.hash(request.body.password);
      })
      .then((passwordHash) => {
        return models.User
          .create({
            username: request.body.username,
            password: passwordHash,
          });
      })
      .then((user) => {
        response.json({
          id: user._id,
          username: user.username,
        });
      })
      .catch(error => handleError(error, response));;
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