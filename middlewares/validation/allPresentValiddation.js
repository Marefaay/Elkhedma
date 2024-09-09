const joi = require("joi");
/// schema

const schema = joi.object({
  meetingName: joi.string().trim().required().min(8).max(50),
});

const allPresentValiddation = async (request, response, next) => {
  const errorsArray = [];
  const { error } = schema.validate(request.body);
  if (!error) {
    next();
  } else {
    error.details.forEach((msg) => {
      errorsArray.push(msg.message);
    });
    response.json(errorsArray);
  }
};
module.exports = allPresentValiddation;
