const models = require("../models");
const PasswordHelper = require("../helpers/PasswordHelper");
const ValidationError = require("../helpers/ValidationError");

module.exports = {
  create: function(request, response, next) {
    models.User
      .findOne({
        username: request.body.username,
      })
      .then((existingUser) => {
        const error = new ValidationError();
        if (existingUser) {
          error.addError("username", "Username taken.");
        } else if (!request.body.username.length) {
          error.addError("username", "Please enter a username.");
        }
        if (!request.body.password.length) {
          error.addError("password", "Please enter a password.");
        }
        if (error.isInvalid()) {
          throw error;
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
        models.Portfolio
          .create({
            userId: user._id,
          })
          .then((portfolio) => {
            response.json({
              id: user._id,
              username: user.username,
            });
          })
          .catch(next);
      })
      .catch(next);
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