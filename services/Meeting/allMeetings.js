const meetingModel = require("../../models/meetingModel");

const allMeetings = async (request, response) => {
  const all = await meetingModel
    .find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 })
    .populate({ path: "createdBy", select: "username" });
  const meetingCounts = await meetingModel.find({}).count();
  //no meetings
  if (all.length == 0) {
    return response.json({ status: "Error", messsage: "Oops!,No Meetings" });
  }
  return response.json({
    status: "Success",
    message: "Congratulations,All Meetings Retrived Succefully",
    meetingCounts,
    all,
  });
};
module.exports = allMeetings;
