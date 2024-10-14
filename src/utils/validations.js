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

module.exports = {
  validateSignUpData,
};
