const multer = require("multer");
const storage = require("./photoStorage");

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "UnSupported file Type tp uload" }, false);
    }
  },

  limits: { fieldSize: 1024 * 1024 }, //1mega
});
module.exports = uploadImage;
