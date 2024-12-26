import { Email } from "../types/Email";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
type OAuth2Client = ReturnType<typeof google.auth.OAuth2>;
import { Credentials } from "../types/Credentials";

class EmailService {
  private oauth2Client: OAuth2Client;
  private cachedAccessToken: { token: string; expiry: number } | null = null;
  private refreshTokenRetryCount = 0;
  private readonly MAX_REFRESH_RETRIES = 3;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    });

    this.oauth2Client.on("tokens", (tokens: Credentials) => {
      if (tokens.refresh_token) {
        process.env.GMAIL_OAUTH_REFRESH_TOKEN = tokens.refresh_token;

        this.refreshTokenRetryCount = 0;
      }
    });
  }

  private async getCachedAccessToken(): Promise<string> {
    const currentTime = Date.now();

    if (
      this.cachedAccessToken &&
      this.cachedAccessToken.expiry > currentTime + 60000
    ) {
      return this.cachedAccessToken.token;
    }

    try {
      const { token, res } = await this.oauth2Client.getAccessToken();

      if (!token) {
        throw new Error("Failed to retreive access token from Google");
      }

      this.cachedAccessToken = {
        token,
        expiry: currentTime + (res?.data.expires_in - 60) * 1000,
      };

      return token;
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message?.includes("invalid_grant") &&
          this.refreshTokenRetryCount < this.MAX_REFRESH_RETRIES
        ) {
          this.refreshTokenRetryCount++;
          await this.refreshOAuthToken();
          return this.getCachedAccessToken();
        }
        throw new Error(`Failed to get access token: ${error.message}`);
      }
      throw new Error("Failed to get access token: Unknown error");
    }
  }

  private async refreshOAuthToken(): Promise<void> {
    try {
      await this.oauth2Client.getRequestHeaders();
      const credentials = this.oauth2Client.credentials;

      if (credentials.refresh_token) {
        process.env.GMAIL_OAUTH_REFRESH_TOKEN = credentials.refresh_token;
        this.oauth2Client.setCredentials({
          refresh_token: credentials.refresh_token,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error("Failed to send email: Unknown error");
    }
  }

  private async createTransporter() {
    const accessToken = await this.getCachedAccessToken();

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ildidvorani@gmail.com",
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async sendEmails({
    to,
    subject,
    ownerMessage,
    userMessage,
  }: Email): Promise<void> {
    try {
      const transporter = await this.createTransporter();

      await transporter.sendMail({
        from: "ildidvorani@gmail.com",
        to,
        subject,
        text: ownerMessage,
      });

      this.delay(5 * 60 * 1000).then(async () => {
        try {
          const delayedTransporter = await this.createTransporter();
          await delayedTransporter.sendMail({
            from: "ildidvorani@gmail.com",
            to,
            subject: "Thank you for contacting us!",
            text: userMessage,
          });
        } catch (error) {
          console.error("Error sending delayed acknowledgment email:", error);
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error("Failed to send email: Unknown error");
    }
  }
}

export const emailService = new EmailService();
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   process.env.OAUTH_CLIENT_ID,
//   process.env.OAUTH_CLIENT_SECRET,
//   "https://developers.google.com/oauthplayground"
// );

// oauth2Client.setCredentials({
//   refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
// });

// let cachedAccessToken: { token: string; expiry: number } | null = null;

// const getCachedAccessToken = async (): Promise<string> => {
//   const currentTime = Date.now();

//   if (cachedAccessToken && cachedAccessToken.expiry > currentTime) {
//     return cachedAccessToken.token;
//   }

//   const { token, res } = await oauth2Client.getAccessToken();
//   if (!token) {
//     throw new Error("Failed to retrieve access token from Google");
//   }

//   cachedAccessToken = {
//     token,
//     expiry: currentTime + (res.data.expires_in - 60) * 1000,
//   };

//   return token;
// };

// const createTransporter = async () => {
//   const accessToken = await getCachedAccessToken();

//   return nodemailer.createTransport({
//     tls: {
//       rejectUnauthorized: false,
//     },
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: "ildidvorani@gmail.com",
//       clientId: process.env.OAUTH_CLIENT_ID,
//       clientSecret: process.env.OAUTH_CLIENT_SECRET,
//       refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
//       accessToken: accessToken,
//     },
//   });
// };

// const sendEmails = async ({
//   to,
//   subject,
//   ownerMessage,
//   userMessage,
// }: Email) => {
//   const transporter = await createTransporter();

//   await transporter.sendMail({
//     from: "ildidvorani@gmail.com",
//     to,
//     subject,
//     text: ownerMessage,
//   });

//   setTimeout(async () => {
//     await transporter.sendMail({
//       from: "ildidvorani@gmail.com",
//       to,
//       subject: "Thank you for contacting us!",
//       text: userMessage,
//     });
//   }, 5 * 60 * 1000);
// };
