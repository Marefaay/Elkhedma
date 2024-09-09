const meetingModel = require("../../models/meetingModel");

const updateMeeting = async (request, response) => {
  const { meetingName, meetingDate, meetingTime } = request.body;
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
  //meeting exxist
  await meetingModel.updateOne(
    { _id: id },
    {
      meetingName: meetingName,
      meetingDate: meetingDate,
      meetingTime: meetingTime,
    }
  );
  //reponse
  return response.json({
    status: "Success",
    message: "Congratularions,Meeting updated Succefully",
  });
};
module.exports = updateMeeting;
