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

let cachedAccessToken: { token: string; expiry: number } | null = null;

const getCachedAccessToken = async (): Promise<string> => {
  const currentTime = Date.now();

  if (cachedAccessToken && cachedAccessToken.expiry > currentTime) {
    return cachedAccessToken.token;
  }

  const { token, res } = await oauth2Client.getAccessToken();
  if (!token) {
    throw new Error("Failed to retrieve access token from Google");
  }

  cachedAccessToken = {
    token,
    expiry: currentTime + (res.data.expires_in - 60) * 1000,
  };

  return token;
};

const createTransporter = async () => {
  const accessToken = await getCachedAccessToken();

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
      accessToken: accessToken,
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
