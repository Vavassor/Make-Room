const models = require("../models");
const PasswordHelper = require("../helpers/PasswordHelper");

module.exports = {
  authenticateJwt: function(jwtPayload, done) {
    models.User
      .findById(jwtPayload.sub)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      })
      .catch(error => done(error));
  },

  authenticateLocal: function(username, password, done) {
    models.User
      .findOne({username: username})
      .then(user => {
        if (!user) {
          return done(null, false);
        }
        PasswordHelper
          .compareHash(password, user.password)
          .then((same) => {
            if (!same) {
              return done(null, false);
            }
            done(null, user);
          })
          .catch(error => done(error));
      })
      .catch(error => done(error));
  },

  deserializeUser: function(id, done) {
    models.User
      .findById(id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      })
      .catch(error => done(error));
  },

  serializeUser: function(user, done) {
    return done(null, user._id);
  },
};