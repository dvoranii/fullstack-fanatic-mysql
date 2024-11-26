import express from "express";
import { authenticate } from "../middleware/authenticate";
import { validateGenericForm } from "../utils/formValidation";

const router = express.Router();

(function () {
  const { sendEmails } = require("../services/emailService");

  router.post("/consultation", authenticate, async (req, res) => {
    const { name, email, message } = req.body;

    const errors = validateGenericForm(name, email, message);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await sendEmails({
        to: email,
        subject: "New Consultation Form Submission",
        ownerMessage: `You have received a new consultation form submission.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        userMessage: `Thank you for reaching out to us, ${name}. We will get back to you shortly.`,
      });

      return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Error sending email", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });

  router.post("/contact", authenticate, async (req, res) => {
    const { fullName, email, message } = req.body;

    const errors = validateGenericForm(fullName, email, message);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      await sendEmails({
        to: email,
        subject: "New Contact Form Submission",
        ownerMessage: `You have received a new contact form submission.\n\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
        userMessage: `Thank you for contacting us, ${fullName}. We will get back to you shortly.`,
      });

      return res.status(200).json({ message: "Form submitted successfully." });
    } catch (error) {
      console.error("Error sending email", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });
})();

export default router;
