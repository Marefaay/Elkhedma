const userAutherization = require("../middlewares/autherization/userAutherization");
const uploadImage = require("../middlewares/upload/photoUpload");
const userLoginValidation = require("../middlewares/validation/userValidation");
const loginAsUser = require("../services/user/loginAsUser");
const profilePhoto = require("../services/user/profilePhoto");

const scan = require("../services/Meeting/scan");
const uploadQR = require("../middlewares/upload/QRsUpload");
// const uploadQR = require("../middlewares/upload/QRsUpload");
const router = require("express").Router();

router.post("/login-as-user", userLoginValidation, loginAsUser);
router.post(
  "/profile/upload-profile-photo",
  userAutherization,
  uploadImage.single("image"),
  profilePhoto
);
router.post("/scan", userAutherization, uploadQR.single("QR"), scan);
module.exports = router;