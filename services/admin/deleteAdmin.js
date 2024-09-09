const adminModel = require("../../models/adminModel");

const deleteAdmin = async (request, response) => {
  const { ID } = request.body;
  // console.log(ID)
  const regEX = /(b|g)(\d{2})$/i;
  if (!ID.match(regEX)) {
    return response.json({
      status: "Error",
      message: "Oops!,Please Enter Valid ID Such as 'B75' Or 'G75' ",
    });
  }
  ///find Admin
  const admin = await adminModel.findOne({ ID });
  console.log(admin);
  if (!admin) {
    return response.json({
      status: "Error",
      message: "Oops!,There Is No Admin With This ID",
    });
  }
  //remove from cloudniary
  if (admin.photo.publicId != null) {
    await removeFromCloudinary(admin.photo.publicId);
  }
  ///remive from db
  await adminModel.deleteOne({ ID });
  return response.json({
    status: "Success",
    message: "Congratulaions,Admin Deleted Succefully",
  });
};

module.exports = deleteAdmin;
