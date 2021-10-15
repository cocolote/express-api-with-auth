const jwt = require('jsonwebtoken');
const { Exception } = require('./exception');

exports.getToken = userId => {
  return jwt.sign(
    {
      iat: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + 15 * 60, // expires in 15 min
      user_id: 1
    },
    process.env.API_JWT_SECRET
  );
};

exports.validPassword = password => {
  // Password has to be at least 8 chars long.
  if (password.length < 8)
    throw Exception('Password has to be at least 8 characters long.', 400);
  // Password can't be empty
  if (password.replace(/\s+/g, '').length == 0)
    throw Exception("Password can't be empty", 400);
  // Password has to have a special character.
  if (password.replace(/[A-z0-9]+/g, '').length == 0)
    throw Exception('Password mast contain one special character', 400);
  // Password has to have an uppercase letter.
  if (!password.match(/[A-Z]+/g, ''))
    throw Exception('Password mast contain one uppercase letter', 400);
  // Password has to have at least one number
  if (!password.match(/[0-9]+/g, ''))
    throw Exception('Password mast contain one number', 400);

  return true;
};
