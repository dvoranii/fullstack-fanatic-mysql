import { Email } from "../types/Email";

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
    tls: {
      rejectUnauthorized: false,
    },
    service: "gmail",
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

const sendEmails = async ({
  to,
  subject,
  ownerMessage,
  userMessage,
}: Email) => {
  const transporter = await createTransporter();

  await transporter.sendMail({
    from: "ildidvorani@gmail.com",
    to,
    subject,
    text: ownerMessage,
  });

  setTimeout(async () => {
    await transporter.sendMail({
      from: "ildidvorani@gmail.com",
      to,
      subject: "Thank you for contacting us!",
      text: userMessage,
    });
  }, 5 * 60 * 1000);
};

module.exports = { sendEmails };
