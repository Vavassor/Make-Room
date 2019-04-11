const models = require("../models");

function verifyPassword(a, b) {
  return a === b;
}

module.exports = {
  authenticateBasic: function(username, password, done) {
    models.User
      .findOne({username: username})
      .then(user => {
        if (!user || verifyPassword(user.password, password)) {
          return done(null, false);
        }
        done(null, user);
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
    return done(null, user.id);
  },
};