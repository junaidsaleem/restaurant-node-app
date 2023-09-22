const jwt = require("jsonwebtoken");
const key = "secret";

const createToken = (customer) => {
  const toke = jwt.sign({ email: customer.email }, key);
  return toke;
};

const checkToken = (token) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createToken,
  checkToken,
};
