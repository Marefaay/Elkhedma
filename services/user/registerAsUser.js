// const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel");
//Business Logic
const registerAsUser = async (request, response) => {
  //User Data
  const { username, ID, gender } = request.body;
  const user = await userModel.findOne({ username });
  const userId = await userModel.findOne({ ID });
  //Check on User Name
  if (!user) {
    if (!userId) {
      userModel.insertMany({
        username,
        ID,
        gender,
      });
      return response.json({
        status: "Success",
        message: "Congratulations,User Added Succefully",
      });
    } else {
      return response.json({
        status: "Error",
        message: "Oops!,ID must be unique",
      });
    }
  } else {
    return response.json({
      status: "Error",
      message: "Oops!,Username  Already exists",
    });
  }
};
module.exports = registerAsUser;
