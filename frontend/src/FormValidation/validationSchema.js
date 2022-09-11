import { object, string, ref } from "yup";

const signupValidationSchema = object({
  username: string()
    .min(3, "Your username should be at least 3 letters!")
    .max(20,"Username should contain less than 20 characters!")
    .required("Username is required!"),
  email: string()
    .required("Email is required!")
    .email("Your email must be valid email!"),
  password: string()
    .min(7, "Password must be at least 7 characters!")
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
export { signupValidationSchema, loginValidationSchema };
