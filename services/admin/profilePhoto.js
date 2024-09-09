const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uploadToCloudinary = require("../../utils/uploadToCloudinary");
const adminModel = require("../../models/adminModel");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const profilePhoto = async (request, response) => {
  const token = request.header("token");
  if (request.file) {
    //get image path
    const image = path.join(__dirname, `../../images/${request.file.filename}`);
    //upload image to cloudinary
    const uplod = await uploadToCloudinary(image);

    //get user
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response.json({ status: "Error", message: err.message });
      } else {
        const admin = await adminModel.findById(decoded.id);

        //delete old image
        if (admin.photo.publicId !== null) {
          await removeFromCloudinary(admin.photo.publicId);
        }
        //change profile photo
        admin.photo = {
          url: uplod.secure_url,
          publicId: uplod.public_id,
        };

        await admin.save();
      }
    });
    //delete image from local server
    fs.unlinkSync(image);
    return response.json({
      status: "Success",
      message: "Congratulations,Your Profile Photo Uploaded Succefully",
    });
  } else {
    return response.json({
      stauts: "Error",
      message: "Oops!,no file to upload",
    });
  }
};
module.exports = profilePhoto;
