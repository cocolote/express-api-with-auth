const bcrypt = require('bcrypt');
const { UsersDAO } = require('@daos/users');
const { Exception } = require('@utils/exception');
const { validPassword } = require('@utils/auth');

const getById = async userId => {
  /**
   * Get a user by ID.
   *
   * Args:
   *  userId (int): The user ID.
   *
   * Returns:
   *  A user object.
   */
  return await UsersDAO.getById(userId);
};

const getByEmail = async email => {
  /**
   * Get user by email.
   *
   * Args:
   *  email (string): The user's email.
   *
   * Returns:
   *  A User object.
   */
  return await UsersDAO.getByEmail(email);
};

const registerUser = async newUser => {
  /**
   * Create a new user. Check here for valid password.
   *
   * Args:
   *  newUser = {
   *    email (string),
   *    password (string),
   *    first_name (string),
   *    last_name (string)
   *  }
   *
   * Returns:
   *  A User object.
   */
  if (!newUser.email ||
      newUser.email.replace(/\s+/g, '').length == 0)
    throw Exception('Email is required', 400);
  if (!newUser.first_name ||
      newUser.first_name.replace(/\s+/g, '').length == 0)
    throw Exception('First name is required', 400);
  if (!newUser.last_name ||
      newUser.first_name.replace(/\s+/g, '').length == 0)
    throw Exception('Last name is required', 400);

  if (validPassword(newUser.password)) {
    // Now we can hash the password.
    const saltRounds = 10;
    try {
      newUser.password = await bcrypt.hash(
        newUser.password,
        saltRounds,
      );
      return await UsersDAO.create(newUser);
    } catch (err) {
      throw Exception(
        `Faild to create new user ${err.toString()}`,
        422
      );
    }
  }
};

const signIn = async ({ email, password }) => {
  /**
   * Sign In a user
   *
   * Args:
   *  email (string): user's email set upon registration.
   *  password (string): user's password set upon registration.
   *
   * Returns:
   *  User object
   */
  if (!email || !password)
    throw Exception('Invalid email or password', 400);

  const user = await getByEmail(email);
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    throw Exception('Invalid email or password', 400);

  return user;
};

exports.UsersMGR = {
  getById,
  getByEmail,
  registerUser,
  signIn,
};
