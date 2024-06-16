const mongoose = require("mongoose");

//Admin Schema

const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlenght: 100,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlenght: 100,
    },
    ID: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
    },
    photo: {
      type: Object,
      default: {
        url: "https://th.bing.com/th/id/R.152c34a899b6bf22d4da6c91b74403dd?rik=ELN9t4jt5Z7dhA&pid=ImgRaw&r=0",
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//Admin Model

const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
