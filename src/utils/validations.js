import { roles, EMAIL_REGEX } from "./constants";

export const emailValidator = (email) => {
  if (!email || email.length <= 0) return "Email cannot be empty.";
  if (!EMAIL_REGEX.test(email)) return "Oops! We need a valid email address.";

  return "";
};

export const passwordValidator = (password) => {
  // TODO: reuse this in sign up form or reset password form
  // const re =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9 _.,!()+=`,"@$#%*-]{8,}$/;

  if (!password || password.length <= 0) return "Password cannot be empty.";
  // if (!re.test(password))
  //   return "Password must contain at least 8 characters, a capital letter, a lowercase letter, and a number";

  return "";
};

export const strongPasswordValidator = (password) => {
  if (!password || password.length <= 0) return "Password cannot be empty.";

  const regex = /^(?=.*[a-z])(?=.*[A-Z]).{12,}$/;
  const forbiddenStrings = [
    "password",
    "123456",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "test",
  ];

  if (!regex.test(password)) {
    return "Password must be at least 12 characters and include uppercase and lowercase letters";
  }

  const lowerPassword = password.toLowerCase();
  const foundForbidden = forbiddenStrings.find((forbidden) =>
    lowerPassword.includes(forbidden)
  );
  return foundForbidden ? `Password cannot contain '${foundForbidden}'` : "";
};

export const addressValidator = (address) => {
  // if the values of address don't exist or are all empty strings ignore validation
  if (!Object.values(address).filter((each) => each).length) {
    return null;
  }
  const errors = {};
  if (address.zipcode && !address.zipcode.match(/^\d{5}$/)) {
    errors.zipcode = "Zipcode is invalid";
  }
  if (!address?.address1?.length) {
    errors.address1 = "Address Line 1 is required";
  }
  if (!address?.city?.length) {
    errors.city = "City is required";
  }
  if (!address?.state?.length) {
    errors.state = "State is required";
  }
  return errors;
};

export const isAdminUser = (user) => user?.authRole?.name === roles.SUPERUSER;
export const isProgramManager = (user) =>
  user?.authRole?.name === roles.PROGRAM_MANAGER;
