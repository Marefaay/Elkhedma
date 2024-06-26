const meetingModel = require("../../models/meetingModel");
const userModel = require("../../models/userModel");

const allPresent = async (request, response) => {
  const { id } = request.params;
  //find meeting
  const meeting = await meetingModel.findOne({ _id: id });
  if (!meeting) {
    return response.json({
      status: "Error",
      message: "This Meeting Is Not Exist",
    });
  }
  const presentUser = [];
  const users = await userModel.find({});
  if (users.length == 0) {
    return response.json({ status: "Error", message: "No User Are Founded" });
  }
  users.forEach(async (user) => {
    const meetingExist = user.meeting.includes(id);
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
