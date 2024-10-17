const meetingModel = require("../../models/meetingModel");
const userModel = require("../../models/userModel");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const os = require("os");

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

  // Process users one by one
  for (const user of users) {
    for (const meetingId of user.meeting) {
      const meet = await meetingModel.findOne({ _id: meetingId });
      if (meet && meet.meetingName === meetingName) {
        console.log(user.username);
        presentUser.push(user.username);
        break; // Stop checking other meetings for this user once a match is found
      }
    }
  }

  // Check if there are no present users
  if (presentUser.length === 0) {
    return response.json({
      status: "Error",
      message: `Oops!, No Users Are Present in (${meeting.meetingName})`,
    });
  }

  // Create a new workbook and add a sheet
  const wb = XLSX.utils.book_new();
  const wsData = [["Username"]]; // Add headers to the sheet

  // Add the present users to the worksheet
  presentUser.forEach((user) => {
    wsData.push([user]); // Each user in a new row
  });

  const ws = XLSX.utils.aoa_to_sheet(wsData); // Convert data to sheet format
  XLSX.utils.book_append_sheet(wb, ws, "Present Users"); // Append the sheet to the workbook

  // Get the home directory and the path to the Downloads folder
  const homeDir = os.homedir();
  const downloadsDir = path.join(homeDir, "Downloads");

  // Check if the Downloads directory exists, if not, create it
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true }); // Create the Downloads folder if it doesn't exist
  }

  // Write the file to the user's Downloads directory
  const filePath = path.join(
    downloadsDir,
    `PresentUsers_${meeting.meetingName}.xlsx`
  );
  console.log(filePath);

  // Save the file
  try {
    XLSX.writeFile(wb, filePath);

    // Inform the user that the file was saved successfully
    return response.json({
      status: "Success",
      message: `All present users downloaded successfully to ${filePath}`,
    });
  } catch (error) {
    console.error("Error writing file: ", error);
    return response.json({
      status: "Error",
      message: "Error in writing the file",
    });
  }
};

module.exports = allPresent;
