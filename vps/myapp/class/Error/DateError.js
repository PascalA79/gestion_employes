module.exports = class DateError  extends Error {
    constructor(message='Invalid Date', options) {
      super(message, options);
      super.name='DateError'
    }
  }