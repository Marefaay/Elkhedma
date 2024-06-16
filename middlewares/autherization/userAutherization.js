const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const userAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      response.json({ message: "Error", err });
    } else {
      request.id=decoded.id
      next();
    }
  });
};
module.exports = userAutherization;
