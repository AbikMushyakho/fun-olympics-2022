import { object, string, ref } from "yup";

const signupValidationSchema = object({
  username: string()
    .min(3, "Your username should be at least 3 letters!")
    .max(20, "Username should contain less than 20 characters!")
    .required("Username is required!"),
  email: string()
    .required("Email is required!")
    .email("Your email must be valid email!"),
  password: string()
    .matches(
      /^.*(?=.{7,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .max(30)
    .required("Password is required!"),
  confirmPassword: string()
    .required("Please retype your password.")
    .oneOf([ref("password")], "Your passwords do not match!"),
});
const loginValidationSchema = object({
  email: string()
    .email("Your email must be valid email!")
    .required("Email is required!"),
  password: string()
    .min(7, "Password must be at least 7 characters!")
    .max(30)
    .required("Password is required!"),
});
const updateValidationSchema = (cpDisabled) => {
  let obj = null;
  cpDisabled
    ? (obj = {
        username: string()
          .min(3, "Your username should be at least 3 letters!")
          .max(20, "Username should contain less than 20 characters!")
          .required("Username is required!"),
        email: string()
          .required("Email is required!")
          .email("Your email must be valid email!"),
      })
    : (obj = {
        username: string()
          .min(3, "Your username should be at least 3 letters!")
          .max(20, "Username should contain less than 20 characters!")
          .required("Username is required!"),
        email: string()
          .required("Email is required!")
          .email("Your email must be valid email!"),
        password: string()
          // .min(7, "Password must be at least 7 characters!")
          .required("Please Enter your password")
          .matches(
            /^.*(?=.{7,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Must Contain 7 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        confirmPassword: string()
          .required("Please retype your password.")
          .oneOf([ref("password")], "Your passwords do not match!"),
      });

  return object(obj);
};
export {
  signupValidationSchema,
  loginValidationSchema,
  updateValidationSchema,
};
