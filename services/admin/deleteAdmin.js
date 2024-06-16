const adminModel = require("../../models/adminModel");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");

const deleteAdmin = async (request, response) => {
  const { id } = request.params;
  //find admin
  const admin = await adminModel.findOne({ _id: id });
  console.log(admin);
  // remove image from cloduinary
  if (admin.photo.publicId != null) {
    await removeFromCloudinary(admin.photo.publicId);
  }
  // remove admin itself
  await adminModel.deleteOne({ _id: id });
  return response.json({
    stauts: "Success",
    messsage: "Admin deleted Succefully",
  });
};
module.exports = deleteAdmin;
