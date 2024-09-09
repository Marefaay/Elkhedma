const userModel = require("../../models/userModel");
const allUsers = async (request, response) => {
  const users = await userModel.find(
    {},
    { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, isAdmin: 0 }
  );
  const count = await userModel.find({}).count();
  if (users.length == 0) {
    return response.json({ status: "Error", message: "There Is No Student" });
  }
  return response.json({
    status: "Success",
    message: "All Students Retrived Sucfully",
    count,
    users,
  });
};
module.exports = allUsers;
