import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET as string,
    access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,

    refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,

    reset_pass_secret: process.env.JWT_RESET_PASS_SECRET as string,
    reset_pass_expires_in: process.env.JWT_RESET_PASS_EXPIRES_IN as string,

    reset_url_link: process.env.RESET_URL_LINK,
  },
  senderEmail: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
};
