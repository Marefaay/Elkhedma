const meetingModel = require("../../models/meetingModel");

const adminMeetings = async (request, response) => {
  const meetings = await meetingModel.find({ createdBy: request.id });
  return response.json({ status: "Success", message: "Succes", meetings });
};
module.exports = adminMeetings;
