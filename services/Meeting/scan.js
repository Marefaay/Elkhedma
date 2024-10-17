const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const userModel = require("../../models/userModel");
const meetingModel = require("../../models/meetingModel");

const scan = async (request, response) => {
  if (request.file) {
    try {
      const qrFilePath = path.join(__dirname, "../../../QRS", request.file.filename);
      console.log("Uploaded file:", request.file.filename);
      console.log("File path:", qrFilePath);
      
      if (!fs.existsSync(qrFilePath)) {
        return response.json({ status: "Error", message: "File does not exist." });
      }

      const buffer = fs.readFileSync(qrFilePath);
      const image = await jimp.read(buffer);
      const qrcode = new QrCode();

      qrcode.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return response.json({ message: "Invalid QR Code", error: err });
        } else {
          const resultData = JSON.parse(value.result);
          const user = await userModel.findOne({ _id: request.id });
          if (!user) {
            return response.json({ status: "Error", message: "User Not found" });
          }

          const meeting = await meetingModel.findOne({ meetingName: resultData[0].meetingName });
          if (!meeting) {
            return response.json({ status: "Error", message: "Meeting Not Found" });
          }
          if (user.meeting.includes(meeting._id)) {
            return response.json({ status: "Error", message: "Attendance already recorded for this meeting" });
          }

          user.meeting.push(meeting._id);
          await user.save();
          return response.json({ status: "Success", message: "Meeting Attendance Recorded Successfully" });
        }
      };

      qrcode.decode(image.bitmap);
      
      if (fs.existsSync(qrFilePath)) {
        fs.unlinkSync(qrFilePath);
      }
    } catch (err) {
      console.error("Error:", err.message);
      return response.json({ status: "Error", message: err.message });
    }
  } else {
    return response.json({ status: "Error", message: "No File To Upload" });
  }
};

module.exports = scan;
