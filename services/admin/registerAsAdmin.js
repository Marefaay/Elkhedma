const adminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
//Business Logic
const registerAsAdmin = async (request, response) => {
  //User Data
  const { username, password, ID, gender } = request.body;
  const admin = await adminModel.findOne({ username });
  const adminId = await adminModel.findOne({ ID });
  //Check on User Name
  if (!admin) {
    if (!adminId) {
      // Password Encryption
      const myPlaintextPassword = password;
      const saltRounds = 4;
      bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
        if (err) {
          return response.json({ status: "Error", message: err.message });
        } else {
          adminModel.insertMany({
            username,
            password: hash,
            ID,
            gender,
          });
          return response.json({
            status: "Success",
            message: "Congratulations,Admin Registred Succefully",
          });
        }
      });
    } else {
      return response.json({
        status: "Success",
        message: "Oops!,ID must be unique",
      });
    }
  } else {
    return response.json({
      status: "Success",
      message: "Oops!,Username  Already exists",
    });
  }
};
module.exports = registerAsAdmin;
