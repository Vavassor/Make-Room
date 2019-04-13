const jwt = require("jsonwebtoken");

module.exports = {
  create: (request, response) => {
    const payload = {
      sub: request.user._id,
    };
    const data = {
      token: jwt.sign(payload, process.env.JWT_SECRET),
    };
    response.json(data);
  },
};