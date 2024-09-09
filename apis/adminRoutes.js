const adminAutherization = require("../middlewares/autherization/adminAutherization");
const storage = require("../middlewares/upload/photoStorage");
const uploadImage = require("../middlewares/upload/photoUpload");
const adminRegisterValidation = require("../middlewares/validation/adminValidation");
const objectIdValidation = require("../middlewares/validation/objectIdValidation");
const allMeetings = require("../services/Meeting/allMeetings");
const createMeeting = require("../services/Meeting/createMeeting");
const deleteAll = require("../services/Meeting/deleteAll");
const deleteMeeting = require("../services/Meeting/deleteMeeting");
const updateMeeting = require("../services/Meeting/updateMeeting");
const registerAsUser = require("../services/user/registerAsUser");
const userLoginValidation = require("../middlewares/validation/userValidation");

const allUsers = require("../services/user/allUsers");
const deleteAdmin = require("../services/admin/deleteAdmin");
const deleteUser = require("../services/user/deleteUser");
const loginAsAdmin = require("../services/admin/loginAsAdmin");
const profilePhoto = require("../services/admin/profilePhoto");
const registerAsAdmin = require("../services/admin/registerAsAdmin");
const adminMeetings = require("../services/Meeting/adminsMeetings");
const meetingValidation = require("../middlewares/validation/meetingValidation");
const allPresent = require("../services/admin/allPresent");
const allPresentValiddation = require("../middlewares/validation/allPresentValiddation");
const router = require("express").Router();

router.post("/register-as-admin", adminRegisterValidation, registerAsAdmin);
router.post("/login-as-admin", adminRegisterValidation, loginAsAdmin);
router.post("/add-user", userLoginValidation, registerAsUser);

router.post(
  "/profile/upload-profile-photo",
  adminAutherization,

  uploadImage.single("image"),
  profilePhoto
);
router.get("/all-users", adminAutherization, allUsers);
// router.get("/all-admins", adminAutherization, allAdmins);
router.delete(
  "/delete-user",

  adminAutherization,
  deleteUser
);
router.delete("/delete-admin", adminAutherization, deleteAdmin);
router.post(
  "/meetings/create-meeting",
  adminAutherization,
  meetingValidation,
  createMeeting
);
router.get("/meetings/all-meetings", adminAutherization, allMeetings);
router.delete(
  "/meetings/delete-meeting/:id",
  objectIdValidation,
  adminAutherization,
  deleteMeeting
);
router.delete("/meetings/delete-all", adminAutherization, deleteAll);
router.put(
  "/meetings/update-meeting/:id",
  objectIdValidation,
  adminAutherization,
  meetingValidation,
  updateMeeting
);
router.get("/admin-meetigs", adminAutherization, adminMeetings);
router.get(
  "/all-present",
  adminAutherization,
  allPresentValiddation,
  allPresent
);
module.exports = router;
