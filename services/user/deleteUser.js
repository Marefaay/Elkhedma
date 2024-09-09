const userModel = require("../../models/userModel");

const deleteUser = async (request, response) => {
  const { ID } = request.body;
  ///check ID
  const regEX = /(b|g)(\d{2})$/i;
  if (!ID.match(regEX)) {
    return response.json({
      status: "Error",
      message: "Please Enter Valid ID Such as 'B75' Or 'G75' ",
    });
  }
  ///find user
  const user = await userModel.findOne({ ID });
  ///user Is Not Found
  if (!user) {
    return response.json({
      status: "Error",
      message: "Oops!,There is No User Founded With This ID",
    });
  }
  ///user Is Found
  await userModel.deleteOne({ ID });
  return response.json({
    stauts: "Success",
    message: "Congratulations,User Delted Succeully",
  });
};
module.exports = deleteUser;
