const meetingModel = require("../../models/meetingModel");

const deleteMeeting = async (request, response) => {
  const { id } = request.params;
  //find meeting
  const meeting = await meetingModel.findOne({ _id: id });
  //meeting not exist
  if (!meeting) {
    return response.json({
      status: "Error",
      message: "Oops!,Meeting is not found",
    });
  }
  //meeting is exist
  //delte it
  await meetingModel.deleteOne({ _id: id });
  //response
  return response.json({
    status: "Success",
    message: "Congratulations,Meeting deleted Succefully",
  });
};
module.exports = deleteMeeting;
