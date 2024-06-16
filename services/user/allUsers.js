const userModel = require("../../models/userModel");
const allUsers = async (request, response) => {
  const users = await userModel.find({});
  const count = await userModel.find({}).count();
  if (users.length == 0) {
    return response.json({ status: "Error", message: "There Is No Student" });
  }
  return response.json({ status: "Success", message: "Succes", count, users });
};
module.exports = allUsers;
