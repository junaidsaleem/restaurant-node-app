// git test: Habib

const jwt = require('jsonwebtoken');
const key = 'habib';

const createToken = (item) => {
    const token = jwt.sign({ username: item.username }, key);
    return token;
};

const checkToken = (token) => {
  try {
    const decoded = jwt.verify(token, key);
    return decoded;
  } catch (err) {
    console.log("Error in checking token");
    return null;
  }
}
  
module.exports = {
  createToken,
  checkToken
};