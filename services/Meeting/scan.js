const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const path = require("path"); // Add path module for path handling
const userModel = require("../../models/userModel");
const meetingModel = require("../../models/meetingModel");

const scan = async (request, response) => {
  if (request.file) {
    try {
      // Build the correct file path
      const filePath = path.join(__dirname, "../../../QRS", request.file.filename);
console.log(filePath)
      // Check if file exists before reading
      if (!fs.existsSync(filePath)) {
        return response.json({
          status: "Error",
          message: "File not found",
        });
      }

      // Read QR code from the file
      const buffer = fs.readFileSync(filePath);
      const image = await jimp.read(buffer);
      const qrcode = new QrCode();

      qrcode.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return response.json({ message: "Invalid QR Code", error: err });
        } else {
          const resultData = JSON.parse(value.result);
          console.log(resultData);

          const user = await userModel.findOne({ _id: request.id });
          if (!user) {
            return response.json({
              status: "Error",
              message: "Oops!, User Not found",
            });
          }
          console.log(user);

          const meeting = await meetingModel.findOne({
            meetingName: resultData[0].meetingName,
          });
          if (!meeting) {
            return response.json({
              status: "Error",
              message: "Oops!, Meeting Not Found",
            });
          }
          console.log(meeting);

          if (user.meeting.includes(meeting._id)) {
            return response.json({
              status: "Error",
              message: "Oops!, You Already Recorded Attendance for this Meeting",
            });
          }

          user.meeting.push(meeting._id);
          await user.save();

          return response.json({
            status: "Success",
            message: "Congratulations, Meeting Attendance Recorded Successfully",
          });
        }
      };

      qrcode.decode(image.bitmap);

      // Delete the file after processing
      fs.unlinkSync(filePath);
    } catch (err) {
      return response.json({ status: "Error", message: err.message });
    }
  } else {
    return response.json({
      status: "Error",
      message: "Oops!, No File To Upload",
    });
  }
};

module.exports = scan;
