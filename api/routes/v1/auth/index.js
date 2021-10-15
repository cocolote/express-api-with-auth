const jwt = require('jsonwebtoken');
const { UsersMGR } = require('@mgrs/users');
const { requireAuth } = require('@middleware/require_auth');
const { getToken } = require('@utils/auth');

module.exports = app => {
  app.route('/api/v1/users/auth')
  // Test route
  .get(requireAuth, async (req, res, next) => {
    try {
      res.json(`Hello user ${req.user_id}!`);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    /* Register a new user
     * 
     * Url: api/v1/users/auth
     * Method: POST
     * Content-Type: application/json
     *
     * 
     * Payload:
     * {
     *    email: str,
     *    first_name: str,
     *    last_name: str,
     *    password: str
     * }
     *
     * Returns:
     *  { user_id: int, token: str }
     */
    try {
      newUser = await UsersMGR.registerUser(req.body);
      res.json({
        user_id: newUser.id,
        token: getToken(newUser.id)
      });
    } catch (e) {
      next(e);
    }
  })
  // Check user and pass, return token
  .put(async (req, res, next) => {
    /* Sign in
     * 
     * Url: api/v1/users/auth
     * Method: PUT
     * Content-Type: application/json
     *
     * 
     * Payload:
     * { email: str, password: str }
     *
     * Returns:
     *  { user_id: int, token: str }
     */
    try {
      user = await UsersMGR.signIn(req.body);
      res.json({
        user_id: user.id,
        token: getToken(user.id)
      });
    } catch (e) {
      next(e);
    }
  });
};
