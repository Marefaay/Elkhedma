const joi = require("joi");
// const namePattern= /[a-zA-Z]_Admin/g;
///Joi Schema
const schema = joi.object({
  username: joi
    .string()
    .trim()
    .required()
    .min(10)
    .max(30)
    .pattern(/[a-zA-Z]_Admin/),
  password: joi
    .string()
    .required()
    .min(8)
    //8char==>1U 1L  1num or special
    .pattern(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    ),
  ID: joi
    .string()
    .required()
    .pattern(/(b|g)(\d{2})$/i),
  // .unique([b, g, B, G]),
  gender: joi.string().pattern(/(male|female)/i),
});

//Business Logic

const adminRegisterValidation = async (request, response, next) => {
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
module.exports = adminRegisterValidation;
