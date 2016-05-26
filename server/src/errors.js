export class JSONError extends Error {
  constructor(httpStatus, message) {
    super(message);
    this.status = httpStatus;
  }

  json() {
    return {
      status: this.status,
      message: this.message
    };
  }
}
