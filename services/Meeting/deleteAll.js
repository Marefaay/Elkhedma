const meetingModel = require("../../models/meetingModel");

const deleteAll = async (request, response) => {
  await meetingModel.deleteMany({});
  return response.json({
    status: "Success",
    message: "Congratulations,All meeting Deleted Succefully",
  });
};
module.exports = deleteAll;
