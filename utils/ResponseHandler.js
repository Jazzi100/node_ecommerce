class ResponseHandler {
  // Success Response
  static success(res, message = 'Success', data = null, statusCode = 200) {
    return res.status(statusCode).json({
      status: true,
      statusCode: statusCode,
      message: message,
      data: data,
      errorCode: null,
    })
  }

  // Error Response
  static error(res, message = 'Internal Server Error', statusCode = 500, errorCode = 'INTERNAL_ERROR', data = null) {
    return res.status(statusCode).json({
      status: false,
      statusCode: statusCode,
      message: message,
      data: data,
      errorCode: errorCode,
    });
  }
}

module.exports = ResponseHandler