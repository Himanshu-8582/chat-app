import nodemailer from "nodemailer";
import { ENV } from "../utils/env.js";
import ApiError from "../utils/ApiError.js";

   //2️⃣ Email Configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ENV.EMAIL_FROM,
      pass: ENV.EMAIL_PASSWORD, // Gmail App Password
    },
  });

export const sendWelcomeEmail = async (to, subject, htmlContent) => {

  const mailOptions = {
    from: `"${ENV.EMAIL_FROM_NAME}" <${ENV.EMAIL_FROM}>`,
    to: to,
    subject: subject,
    html: htmlContent,
    };
    
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      throw new ApiError(500, "Failed to send welcome email");
    }
};
