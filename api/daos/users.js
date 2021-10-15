const { connection } = require('@utils/dbconn');
const { Exception } = require('@utils/exception');

const getById = async userId => {
  const conn = await connection();
  try {
    const [rows, fields] = await conn.execute(`
      SELECT *
        FROM users
       WHERE id = ?
         AND deleted_at IS NULL;
    `, [userId]);

    if (rows.length < 1)
      throw Exception(`User with id ${userId} not found`, 404);

    return rows[0];
  } catch (err) {
    throw err;
  }
};

const getByEmail = async email => {
  const conn = await connection();
  try {
    const [rows, fields] = await conn.execute(`
      SELECT *
        FROM users
       WHERE email = ?
         AND deleted_at IS NULL;
    `, [email]);

    if (rows.length < 1)
      throw Exception(`User with email ${email} not found`, 404);

    return rows[0];
  } catch (err) {
  }
};

const create = async newUser => {
  const conn = await connection();
  try {
    const [ret, fields] = await conn.execute(`
      INSERT INTO users (
          email,
          password,
          first_name,
          last_name,
          role
      ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
      );`, [
      newUser.email,
      newUser.password,
      newUser.first_name,
      newUser.last_name,
      newUser.role || 'user'
    ]);
    return await getById(ret.insertId);
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (userId, newPassword) => {
  const conn = await connection();
  try {
    const [ret, fields] = await conn.execute(`
      UPDATE users
         SET password = ?
       WHERE id = ?;
    `, [newPassword, userId]);
    return await getById(userId);
  } catch (err) {
    throw err;
  }
};

exports.UsersDAO = {
  getById,
  getByEmail,
  create,
  resetPassword,
};
