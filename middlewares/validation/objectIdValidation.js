const mongoose = require("mongoose");
const objectIdValidation = async (request, response, next) => {
  const { id } = request.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    next();
  } else {
    response.json({ message: "ID Is Not Valid" });
  }
};
module.exports = objectIdValidation;
