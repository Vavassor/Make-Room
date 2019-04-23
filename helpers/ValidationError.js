class ValidationError extends Error {
  constructor(statusCode) {
    super();
    
    this.kind = "validation";
    this.name = "ValidationError";
    this.statusCode = statusCode || 422;
    this.errors = [];
  }

  addError(target, message) {
    const error = {
      target: target,
      message: message,
    }
    this.errors.push(error);
  }

  isInvalid() {
    return this.errors.length !== 0;
  }
}

module.exports = ValidationError;