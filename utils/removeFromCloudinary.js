const cloudinary = require("cloudinary");
const removeFromCloudinary = async (imagePublicId) => {
  try {
    const removedImage = await cloudinary.v2.uploader.destroy(imagePublicId);
    return removedImage;
  } catch (error) {
    return error;
  }
};
module.exports = removeFromCloudinary;
