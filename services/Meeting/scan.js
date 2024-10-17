const QrCode = require("qrcode-reader");
const jimp = require("jimp");
// const hh = require("../../QRS");
const fs = require("fs");
const userModel = require("../../models/userModel");
const meetingModel = require("../../models/meetingModel");
const scan = async (request, response) => {
  if (request.file) {
    try {
      //read qr code
      const buffer = fs.readFileSync(
        __dirname + `../../../QRS/${request.file.filename}`
      );
      //read qr code as a buffer
      const image = await jimp.read(buffer);
      const qrcode = new QrCode();
      qrcode.callback = async (err, value) => {
        if (err) {
          console.error(err);
          return response.json({ message: "Invalid QR Code", error: err });
        } else {
          //convert data from string to json
          const resultData = await JSON.parse(value.result);
          console.log(resultData);
          //find user
          const user = await userModel.findOne({ _id: request.id });
          if (!user) {
            return response.json({
              status: "Error",
              message: "Oops!,User Not found",
            });
          }
          console.log(user);
          //find meeting
          const meeting = await meetingModel.findOne({
            meetingName: resultData[0].meetingName,
          });
          if (!meeting) {
            return response.json({
              status: "Error",
              message: "oops!,Meeting Is Not Founds",
            });
          }
          console.log(meeting);
          if (user.meeting.includes(meeting._id)) {
            return response.json({
              status: "Error",
              message: "Oops!,You Already Record Attendance fro this meeting",
            });
          }
          user.meeting.push(meeting._id);
          await user.save();
          return response.json({
            status: "Success",
            message: "Congratularrions,Meeting Attendance Reorded Succefully",
          });
        }
      };
      qrcode.decode(image.bitmap);
      fs.unlinkSync(__dirname + `../../../QRS/${request.file.filename}`);
    } catch (err) {
      return response.json({ status: "Error", message: err.message });
    }
  } else {
    return response.json({
      status: "Error",
      message: "Oops!,No File To Upload",
    });
  }
};
module.exports = scan;
