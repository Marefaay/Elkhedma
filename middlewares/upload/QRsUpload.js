const multer = require("multer");
const storage = require("./QRsStrorage");

const uploadQR = multer({
  storage: storage,
});
module.exports = uploadQR;
