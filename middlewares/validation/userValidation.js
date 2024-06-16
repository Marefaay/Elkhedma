const joi = require("joi");
// const namePattern= /[a-zA-Z]_Admin/g;
///Joi Schema
const schema = joi.object({
  username: joi
    .string()
    .trim()
    .required()
    .min(5)
    .max(30)
    .pattern(/^[a-zA-Z0-9]+(?!\W)$/),

  ID: joi
    .string()
    .required()
    .pattern(/(b|g)(\d{2})$/i),
  gender: joi.string().pattern(/(male|female)/i).required(),
});

//Business Logic

const userLoginValidation = async (request, response, next) => {
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
module.exports = userLoginValidation;
