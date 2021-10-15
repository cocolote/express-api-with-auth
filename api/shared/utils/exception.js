exports.Exception = (message, code) => {
  const err = new Error(message);
  err.statusCode = code;
  return err;
};
