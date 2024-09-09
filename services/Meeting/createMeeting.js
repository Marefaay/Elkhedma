const QRCode = require("qrcode");
const meetingModel = require("../../models/meetingModel");
const adminModel = require("../../models/adminModel");
const createMeeting = async (request, response) => {
  const { meetingName, meetingDate, meetingTime } = request.body;
  ///find admin
  const name = await adminModel.findOne({ _id: request.id });
  //find meting
  const meeting = await meetingModel.findOne({ meetingName });
  //meeting exist
  if (meeting) {
    return response.json({
      status: "Error",
      message: "Oops!,This Meeting Already Exist",
    });
  }
  //meeting not exist
  const data = [
    {
      meetingName: meetingName,
      meetingDate: meetingDate,
      meetingTime: meetingTime,
      createdBy: name.username,
    },
  ];

  // Converting the data into String format
  let stringdata = JSON.stringify(data);
  // Print the QR code to terminal
  QRCode.toString(stringdata, { type: "terminal" }, (err, QRcode) => {
    if (err) {
      return console.log(err);
    } else {
      // Printing the generated code
      console.log(QRcode);
    }
  });
  // Converting the data into base64
  QRCode.toDataURL(stringdata, async (err, code) => {
    if (err) {
      return console.log(err);
    } else {
      // Printing the code
      console.log(code);
      const meeting = await meetingModel.insertMany({
        meetingName: meetingName,
        meetingDate: meetingDate,
        meetingTime: meetingTime,
        createdBy: request.id,
        meetingQR: { url: code },
      });

      return response.json({
        status: "Success",
        message: "Congratulations,Meeting created succefullly",
        meeting,
      });
    }
  });
};
module.exports = createMeeting;
