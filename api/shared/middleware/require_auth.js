/**
 * Middleware to check the authentication token on each request to the API that
 * needs to be secure.
 */
const jwt = require('jsonwebtoken');
const path = require('path');
const { Exception } = require('@utils/exception');

exports.requireAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth ? auth.split(' ')[1] : null;
  try {
    const decoded = jwt.verify(token, process.env.API_JWT_SECRET);
    console.log(decoded);
    req.user_id = decoded.user_id
    next();
  } catch (err) {
    throw Exception(err.message, 401);
  }
};
