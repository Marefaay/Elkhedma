const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const removeFromCloudinary = require("../../utils/removeFromCloudinary");
const userModel = require("../../models/userModel");
const uploadToCloudinaryUsers = require("../../utils/uploadTocloudainaryUser");
const profilePhoto = async (request, response) => {
  const token = request.header("token");
  if (request.file) {
    //get image path
    const image = path.join(__dirname, `../../images/${request.file.filename}`);
    //upload image to cloudinary
    const uplod = await uploadToCloudinaryUsers(image);

    //get user
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return response.json({ status: "Error", message: err.message });
      } else {
        const user = await userModel.findById(decoded.id);

        //delete old image
        if (user.photo.publicId !== null) {
          await removeFromCloudinary(user.photo.publicId);
        }
        //change profile photo
        user.photo = {
          url: uplod.secure_url,
          publicId: uplod.public_id,
        };

        await user.save();
      }
    });
    //delete image from local server
    fs.unlinkSync(image);
    return response.json({
      status: "Success",
      message: "Congratularions,Your Profile Photo Uploaded Succefully",
    });
  } else {
    return response.json({
      status: "Error",
      message: "Oops!,No file to upload",
    });
  }
};
module.exports = profilePhoto;
