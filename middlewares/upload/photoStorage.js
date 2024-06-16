const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../images"));
  },
  filename: function (req, file, cb) {
    if (file) {
      const date = new Date().toISOString().replace(/:/g, "-");
      cb(null, date + file.originalname);
    } else {
      cb(null, false);
    }
  },
});
module.exports = storage;
