const QrCode = require("qrcode-reader");
const jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // Multer for file uploads
const userModel = require("../../models/userModel");
const meetingModel = require("../../models/meetingModel");

// Configure Multer to store uploaded files in /tmp
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../../QRS"); // Store files in the /tmp directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save with the original filename
  }
});
const upload = multer({ storage: storage });

const scan = async (request, response) => {
  upload.single('file')(request, response, async (err) => {
    if (err) {
      console.error("Error during file upload:", err);
      return response.json({ status: "Error", message: "File upload failed" });
    }

    if (request.file) {
      try {
        // Construct file path from /tmp
        const filePath = path.join("../../../QRS/", request.file.filename);

        // Log file path for debugging purposes
        console.log("File path:", filePath);

        // Check if the file exists in the /tmp directory
        if (!fs.existsSync(filePath)) {
          console.error("File not found at:", filePath);
          return response.json({
            status: "Error",
            message: "File not found",
          });
        }

        // Read the QR code from the file
        const buffer = fs.readFileSync(filePath);
        const image = await jimp.read(buffer);
        const qrcode = new QrCode();

        qrcode.callback = async (err, value) => {
          if (err) {
            console.error("Error decoding QR code:", err);
            return response.json({ status: "Error", message: "Invalid QR Code", error: err });
          } else {
            try {
              const resultData = JSON.parse(value.result);
              console.log("QR Code data:", resultData);

              // Find the user by their ID
              const user = await userModel.findOne({ _id: request.id });
              if (!user) {
                console.error("User not found with ID:", request.id);
                return response.json({
                  status: "Error",
                  message: "Oops!, User Not found",
                });
              }
              console.log("User found:", user);

              // Find the meeting by the name from the QR code
              const meeting = await meetingModel.findOne({
                meetingName: resultData[0].meetingName,
              });
              if (!meeting) {
                console.error("Meeting not found:", resultData[0].meetingName);
                return response.json({
                  status: "Error",
                  message: "Oops!, Meeting Not Found",
                });
              }
              console.log("Meeting found:", meeting);

              // Check if user has already recorded attendance for this meeting
              if (user.meeting.includes(meeting._id)) {
                return response.json({
                  status: "Error",
                  message: "Oops!, You Already Recorded Attendance for this Meeting",
                });
              }

              // Add meeting to user's attendance and save
              user.meeting.push(meeting._id);
              await user.save();

              return response.json({
                status: "Success",
                message: "Congratulations, Meeting Attendance Recorded Successfully",
              });
            } catch (innerErr) {
              console.error("Error processing QR code data:", innerErr);
              return response.json({ status: "Error", message: innerErr.message });
            }
          }
        };

        // Decode the QR code from the image
        qrcode.decode(image.bitmap);

        // Optionally delete the file after processing
        fs.unlinkSync(filePath);

      } catch (err) {
        console.error("Error handling file:", err);
        return response.json({ status: "Error", message: err.message });
      }
    } else {
      return response.json({
        status: "Error",
        message: "Oops!, No File To Upload",
      });
    }
  });
};

module.exports = scan;
