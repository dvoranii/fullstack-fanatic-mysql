import express from "express";
import { authenticate } from "../middleware/authenticate";
import { csrfProtection } from "../middleware/csrf";
import { validateGenericForm } from "../utils/formValidation";
import { verifyRecaptchaToken } from "../utils/recaptchaUtils";
import { blacklist } from "../middleware/IPblacklist";

const router = express.Router();

(function () {
  const { sendEmails } = require("../services/emailService");

  router.post(
    "/consultation",
    authenticate,
    csrfProtection,
    async (req, res): Promise<void> => {
      const { name, email, message, recaptchaToken } = req.body;

      const errors = validateGenericForm(name, email, message);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      if (!recaptchaToken) {
        res.status(400).json({ error: "ReCAPTCHA token is required." });
        return;
      }

      const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
      if (!isRecaptchaValid) {
        res.status(400).json({ error: "ReCAPTCHA verification failed." });
        return;
      }

      try {
        await sendEmails({
          to: email,
          subject: "New Consultation Form Submission",
          ownerMessage: `You have received a new consultation form submission.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
          userMessage: `Thank you for reaching out to us, ${name}. We will get back to you shortly.`,
        });

        res.status(200).json({ message: "Form submitted successfully." });
        return;
      } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({ error: "Failed to send email" });
        return;
      }
    }
  );

  router.post(
    "/contact",
    blacklist,
    authenticate,
    csrfProtection,

    async (req, res): Promise<void> => {
      const { fullName, email, message, recaptchaToken } = req.body;

      const errors = validateGenericForm(fullName, email, message);
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      if (!recaptchaToken) {
        res.status(400).json({ error: "ReCAPTCHA token is required." });
        return;
      }

      const isRecaptchaValid = await verifyRecaptchaToken(recaptchaToken);
      if (!isRecaptchaValid) {
        res.status(400).json({ error: "ReCAPTCHA verification failed." });
        return;
      }

      try {
        await sendEmails({
          to: email,
          subject: "New Contact Form Submission",
          ownerMessage: `You have received a new contact form submission.\n\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
          userMessage: `Thank you for contacting us, ${fullName}. We will get back to you shortly.`,
        });

        res.status(200).json({ message: "Form submitted successfully." });
        return;
      } catch (error) {
        console.error("Error sending email", error);
        res.status(500).json({ error: "Failed to send email" });
        return;
      }
    }
  );
})();

export default router;
