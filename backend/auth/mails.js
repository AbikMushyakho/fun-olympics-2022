import Mail from "../models/mail.js";

class Mails {
  saveToken = async (email, code) => {
    const exists = await Mail.findOne({ email: email });
    if (exists) {
      exists.code = code;
      await exists.save();
      return exists;
    } else {
      const data = {
        email: email,
        code: code,
      };
      const response = await Mail.create(data);
      if (response) {
        return response;
      }
      return false;
    }
  };
  find = async (email) => {
    const response = await Mail.findOne({ email: email });
    if (response) {
      return response;
    }
    return false;
  };
}
export default new Mails();
