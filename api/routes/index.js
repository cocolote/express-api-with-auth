const authRoutes = require('./v1/auth');

module.exports = function(app) {
  authRoutes(app);
};
