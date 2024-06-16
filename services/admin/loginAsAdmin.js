const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginAsAdmin = async (request, response) => {
  const { username, ID, password } = request.body;
  const admin = await adminModel.findOne({ username });
  // const adminID = await adminModel.findOne({ ID });
  if (admin) {
    if (admin.ID == ID) {
      console.log(admin.ID);
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { id: admin._id, isAdmin: admin.isAdmin, photo: admin.photo },
          process.env.SECRET_KEY
        );
        return response.json({
          status: "Success",
          message: `Welcome Back ${username}`,
          token,
          admin,
        });
      } else {
        return response.json({
          stuats: "Error",
          message: `Password ('${password}') in correct`,
        });
      }
    } else {
      return response.json({
        status: "Error",
        message: `Admin ID('${ID}') Is Not Correct`,
      });
    }
  } else {
    return response.json({
      status: "Error",
      message: `Username ('${username}') Is Not Exist`,
    });
  }
};
module.exports = loginAsAdmin;
