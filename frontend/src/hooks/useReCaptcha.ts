import { useEffect } from "react";

interface Grecaptcha {
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const useReCaptcha = () => {
  const loadReCaptchaScript = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src*="recaptcha/api.js"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };
      script.onerror = () => reject("Failed to load Google ReCAPTCHA script");

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!SITE_KEY) {
      console.error("ReCAPTCHA site key is missing.");
      return;
    }

    loadReCaptchaScript().catch((error) => {
      console.error(error);
    });
  }, []);

  const getReCaptchaToken = async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      throw new Error("ReCAPTCHA is not initialized.");
    }

    return await window.grecaptcha.execute(SITE_KEY, { action });
  };

  return { getReCaptchaToken };
};

export default useReCaptcha;
