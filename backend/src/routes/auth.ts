import express from "express";
import { google } from "googleapis";
import connectionPromise from "../db/db";

const router = express.Router();

router.get("/google/setup", (_req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.OAUTH_REDIRECT_URI
    );

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/gmail.send"],
        prompt: "consent"
    });

    res.redirect(authUrl);
})

router.get("/google/callback", async (req, res) => {
    try {
        const {code} = req.query;

        if (!code || typeof code !== "string") {
            throw new Error("No authorization code received");
        }

        const oauth2Client = new google.auth.OAuth2(
            process.env.OAUTH_CLIENT_ID,
            process.env.OAUTH_CLIENT_SECRET,
            process.env.OAUTH_REDIRECT_URI
        );

        const {tokens} = await oauth2Client.getToken(code);

        if (!tokens.refresh_token) {
            throw new Error("No refresh token received");
        }

        const connection = await connectionPromise;

        await connection.execute(
          `INSERT INTO oauth_tokens (refreshToken, accessToken, accessTokenExpiry)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE
             refreshToken = VALUES(refreshToken),
             accessToken = VALUES(accessToken),
             accessTokenExpiry = VALUES(accessTokenExpiry)`,
          [
            tokens.refresh_token,
            tokens.access_token,
            tokens.expiry_date ? new Date(tokens.expiry_date) : null,
          ]
        );
    

        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error during OAuth callback:", error);
        res.status(500).send("Authentication failed");
    }
})

export default router;