const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const adminAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return response.json({ status: "Error", message: err.message });
    } else {
      //if is admin==>true
      if (decoded.isAdmin) {
        request.id = decoded.id;
        next();
      }
      //if is admin==>flase
      else {
        return response.json({
          status: "Error",

          message: "Oops!,You are not allowed to acces this ,only admins",
        });
      }
    }
  });
};
module.exports = adminAutherization;
