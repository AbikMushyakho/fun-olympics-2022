import "dotenv/config";

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;
const SENDER_EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.PASSWORD;
const SECRET = process.env.SECRET;

export { MONGODB_URI, PORT, SENDER_EMAIL, EMAIL_PASSWORD,SECRET };
