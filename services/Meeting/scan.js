const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const userModel = require("../../models/userModel");
const meetingModel = require("../../models/meetingModel");

const scan = async (request, response) => {
  if (request.file) {
    try {
      const filePath = path.join(__dirname, "../../../QRS/", request.file.filename);
      const buffer = fs.readFileSync(filePath);
      const image = await jimp.read(buffer);
      const qrcode = new QrCode();
      
      qrcode.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return response.json({ message: "Invalid QR Code", error: err });
        } else {
          const resultData = await JSON.parse(value.result);
          const user = await userModel.findOne({ _id: request.id });
          if (!user) {
            return response.json({ status: "Error", message: "Oops!, User Not found" });
          }

          const meeting = await meetingModel.findOne({ meetingName: resultData[0].meetingName });
          if (!meeting) {
            return response.json({ status: "Error", message: "Oops!, Meeting Is Not Found" });
          }
          if (user.meeting.includes(meeting._id)) {
            return response.json({ status: "Error", message: "Oops!, You Already Recorded Attendance for this meeting" });
          }

          user.meeting.push(meeting._id);
          await user.save();
          return response.json({ status: "Success", message: "Congratulations, Meeting Attendance Recorded Successfully" });
        }
      };

      qrcode.decode(image.bitmap);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn("File not found for deletion:", filePath);
      }
    } catch (err) {
      return response.json({ status: "Error", message: err.message });
    }
  } else {
    return response.json({ status: "Error", message: "Oops!, No File To Upload" });
  }
};

module.exports = scan;
