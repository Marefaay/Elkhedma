const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const userAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return response.json({ status: "Error", message: err.message });
    } else {
      request.id = decoded.id;
      next();
    }
  });
};
module.exports = userAutherization;
