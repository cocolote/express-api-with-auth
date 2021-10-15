/**
 * Update error format to follow google's
 * {
    "error": {
     "errors": [
      {
       "domain": "global",
       "reason": "required",
       "message": "Login Required",
       "locationType": "header",
       "location": "Authorization"
      }
     ],
     "code": 401,
     "message": "Login Required"
     }
    }
*/

/* Global Error Handler */
module.exports = function(app) {
  // middleware
  app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    console.log(error);
    res.status(error.statusCode).json({
      error: {
        code: error.statusCode,
        message: error.message,
      }
    });
  });

  // capture all rough requests
  app.get('*', (req, res, next) => {
    let error = new Error('Not Found');
    error.statusCode = 404;
    res.status(error.statusCode).json({
      error: {
        code: error.statusCode,
        message: error.message
      }
    });
  });
}
