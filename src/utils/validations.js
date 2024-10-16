const validate = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validate.isEmail(emailId)) {
    throw new Error("Email ID is not valid!");
  } else if (!validate.isStrongPassword(password)) {
    throw new Error("Please enter the strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
  ];

  Object.keys(req.body).every((field) => allowedEditFields.includes(field));

  return allowedEditFields;
};

const validatePassword = (req) => {
  const { password } = req.body;

  if (!validate.isStrongPassword(password)) {
    throw new Error("Please enter the strong password");
  }
  return true;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validatePassword,
};
