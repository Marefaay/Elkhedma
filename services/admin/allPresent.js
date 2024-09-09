const meetingModel = require("../../models/meetingModel");
const userModel = require("../../models/userModel");

const allPresent = async (request, response) => {
  const { meetingName } = request.body;
  if (meetingName === "") {
    return response.json({
      status: "Error",
      message: "Oops!,Please Enter Meeting Name",
    });
  }
  //find meeting
  const meeting = await meetingModel.findOne({ meetingName });
  if (!meeting) {
    return response.json({
      status: "Error",
      message: "Oops!,This Meeting Is Not Exist",
    });
  }
  const presentUser = [];
  const users = await userModel.find({});
  if (users.length == 0) {
    return response.json({
      status: "Error",
      message: "Oops!,No User Are Founded",
    });
  }
  users.forEach(async (user) => {
    const meetingExist = user.meeting.includes(meetingName);
    if (meetingExist) {
      presentUser.push(user.username);
      // await presentUser.save();
    }
  });
  console.log(presentUser);

  const userCount = presentUser.length;
  return response.json({
    status: "Success",
    message: `User Who Are Presested in (${meeting.meetingName}) `,
    userCount,
    presentUser,
  });
};
module.exports = allPresent;
