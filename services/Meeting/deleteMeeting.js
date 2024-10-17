const meetingModel = require("../../models/meetingModel");

const deleteMeeting = async (request, response) => {
  const { meetingName } = request.body;
  //find meeting
  const meeting = await meetingModel.findOne({ meetingName });
  //meeting not exist
  if (!meeting) {
    return response.json({
      status: "Error",
      message: "Oops!,Meeting is not found",
    });
  }
  //meeting is exist
  //delte it
  await meetingModel.deleteOne({ meetingName });
  //response
  return response.json({
    status: "Success",
    message: "Congratulations,Meeting deleted Succefully",
  });
};
module.exports = deleteMeeting;
