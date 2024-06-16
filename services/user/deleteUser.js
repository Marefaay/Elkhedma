const userModel = require("../../models/userModel");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteUser = async (request, response) => {
  const { id } = request.params;
  //find user
  const user = await userModel.findOne({
    _id: id,
  });
  if (!user) {
    return response.json({
      status: "Error",
      message: "This User IS not Found",
    });
  }
  console.log(user.photo);
  //remove from cloud
  if (user.photo.publicId != null) {
    await removeFromCloudinary(user.photo.publicId);
  }
  //delete user itself
  await userModel.deleteOne({ _id: id });
  return response.json({
    status: "Success",
    messsage: "User deleted Succefully",
  });
};
module.exports = deleteUser;
