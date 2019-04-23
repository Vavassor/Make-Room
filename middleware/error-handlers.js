module.exports = {
  generic: function(error, request, response, next) {
    const data = {
      kind: "generic",
      message: error.message,
    };
    response.status(error.statusCode || 500).json(data);
  },

  validation: function(error, request, response, next) {
    if (error.kind === "validation") {
      const data = {
        kind: error.kind,
        message: "Validation failed.",
        errors: error.errors,
      };
      response.status(error.statusCode).json(data);
    } else {
      next(error);
    }
  },
};