const { response } = require("express");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const loginAsUser = async (request, response) => {
  const { username, ID } = request.body;
  const user = await userModel.findOne({ username });
  //   const userID = await userModel.findOne({ ID });
  if (user) {
    if (user.ID == ID) {
      var token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin, photo: user.photo },
        process.env.SECRET_KEY
      );
      return response.json({
        status: "Success",
        message: `Welcome back ${username}`,
        token,
        user,
      });
    } else {
      return response.json({
        status: "Error",
        message: `Oops!,User ID ('${ID}') Is Not Correct`,
      });
    }
  } else {
    return response.json({
      status: "Error",
      message: `Oops!,Username ('${username}') Is Not Exist`,
    });
  }
};
module.exports = loginAsUser;
