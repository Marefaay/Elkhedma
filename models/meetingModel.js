const mongoose = require("mongoose");

//meeting Schema

const meetingSchema = mongoose.Schema(
  {
    meetingName: { type: String },
    meetingDate: { type: String },
    meetingTime: { type: String },
    meetingQR: {
      type: Object,
      default: {
        url: "",
        // publicId: null,
      },
    },
    createdBy: {type:mongoose.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

//meeting Model
const meetingModel = mongoose.model("Meeting", meetingSchema);

module.exports = meetingModel;
