const meetingModel = require("../../models/meetingModel");

const allMeetings = async (request, response) => {
  const all = await meetingModel
    .find({},{_id:0})
    .populate({ path: "createdBy", select: "username" });
  const meetingCounts = await meetingModel.find({}).count();
  //no meetings
  if (all.length == 0) {
    return response.json({ status: "Error", messsage: "No Meetings" });
  }
  return response.json({
    status: "Success",
    message: "Succes",
    meetingCounts,
    all,
  });
};
module.exports = allMeetings;
