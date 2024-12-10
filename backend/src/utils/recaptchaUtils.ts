const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export const verifyRecaptchaToken = async (token: string): Promise<boolean> => {
  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error("RECAPTCHA_SECRET_KEY is not defined in the environment.");
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    }
  );

  const data = await response.json();

  if (!data.success || data.score < 0.5) {
    console.warn("ReCAPTCHA verification failed:", data);
    return false;
  }

  return true;
};
