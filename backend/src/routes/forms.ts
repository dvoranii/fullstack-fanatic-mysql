import express from "express";
import { authenticate } from "../middleware/authenticate";

const router = express.Router();

(function () {
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");

  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
  });

  const accessToken = async () => {
    const { token } = await oauth2Client.getAccessToken();
    return token;
  };

  const createTransporter = async () => {
    const token = await accessToken();

    return nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        type: "OAuth2",
        user: "ildidvorani@gmail.com",
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: token,
      },
    });
  };

  router.post("/consultation", authenticate, async (req, res) => {
    const { name, email, message } = req.body;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const errors = [];
    if (!name) {
      errors.push({ msg: "Please enter your name" });
    }
    if (!email) {
      errors.push({ msg: "Please enter your email" });
    } else if (!emailPattern.test(email)) {
      errors.push({ msg: "Please enter a valid email (e.g., 123@abc.com)" });
    }
    if (!message) {
      errors.push({ msg: "Please enter your message" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    try {
      const transporter = await createTransporter();

      await transporter.sendMail({
        from: "ildidvorani@gmail.com",
        to: email,
        subject: "New Consultation Form Submission",
        text: `You have received a new consultation form submission.
                Name: ${name}
                Email: ${email}
                Message: ${message}`,
      });

      setTimeout(async () => {
        await transporter.sendMail({
          from: "ildidvorani@gmail.com",
          to: email,
          subject: "Thank you for contacting us!",
          text: `Thank you for reaching out to us, ${name}. We will get back to you shortly.`,
        });
      }, 1 * 60 * 1000);

      return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Error sending email", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });
})();

export default router;
