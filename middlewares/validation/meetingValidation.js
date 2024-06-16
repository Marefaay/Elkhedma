const joi = require("joi");
/// schema

const schema = joi.object({
  meetingName: joi.string().trim().required().min(8).max(50),
  meetingDate: joi
    .date()
    .required()
 ,
  meetingTime: joi
    .string()
    .required()
    .pattern(/\d{1,2}(pm|am)/i),
});

const meetingValidation = async (request, response, next) => {
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
module.exports = meetingValidation;
