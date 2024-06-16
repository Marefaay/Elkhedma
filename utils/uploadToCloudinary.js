const cloudinary = require("cloudinary");
//Integration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const uploadToCloudinary = async (image) => {
  try {
    const uploadedImage = cloudinary.v2.uploader.upload(image, {
      folder: "ELkhedma/Admins",
      resource_type: "auto",
    });
  
    return uploadedImage;
  } catch (error) {
    return error;
  }
};
module.exports = uploadToCloudinary;
