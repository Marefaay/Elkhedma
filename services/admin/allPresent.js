const meetingModel = require("../../models/meetingModel");
const userModel = require("../../models/userModel");

const allPresent = async (request, response) => {
  const { meetingName } = request.body;

  // Validate meeting name
  if (!meetingName || meetingName === "") {
    return response.json({
      status: "Error",
      message: "Oops!, Please Enter Meeting Name",
    });
  }

  // Find the meeting by name
  const meeting = await meetingModel.findOne({ meetingName });
  if (!meeting) {
    return response.json({
      status: "Error",
      message: "Oops!, This Meeting Does Not Exist",
    });
  }

  const presentUser = [];

  // Find all users
  const users = await userModel.find({});
  if (users.length === 0) {
    return response.json({
      status: "Error",
      message: "Oops!, No Users Found",
    });
  }

  // Process all users and their meetings
  await Promise.all(users.map(async (user) => {
    await Promise.all(user.meeting.map(async (meetingId) => {
      const meet = await meetingModel.findOne({ _id: meetingId });
      if (meet && meet.meetingName === meetingName) {
        console.log(user.username);
        presentUser.push(user.username);
      }
    }));
  }));

  // Send the final response after all processing is done
  const userCount = presentUser.length;
  return response.json({
    status: "Success",
    message: `Users Who Are Present in (${meeting.meetingName})`,
    userCount,
    presentUser,
  });
};

module.exports = allPresent;
