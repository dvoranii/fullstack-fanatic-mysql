import { useCallback, useEffect, useRef } from "react";

interface Grecaptcha {
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const useReCaptcha = () => {
  const isScriptLoaded = useRef(false);

  const loadReCaptchaScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (isScriptLoaded.current) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        isScriptLoaded.current = true;
        resolve();
      };
      script.onerror = () => reject("Failed to load ReCAPTCHA script");

      document.body.appendChild(script);
    });
  }, []);

  const removeReCaptchaScript = useCallback(() => {
    const script = document.querySelector(`script[src*="recaptcha/api.js"]`);
    if (script) {
      script.parentNode?.removeChild(script);
    }

    const badge = document.querySelector(".grecaptcha-badge");
    if (badge) {
      badge.parentNode?.removeChild(badge);
    }

    delete window.grecaptcha;
    isScriptLoaded.current = false;
  }, []);

  useEffect(() => {
    loadReCaptchaScript();
    return () => {
      removeReCaptchaScript();
    };
  }, [loadReCaptchaScript, removeReCaptchaScript]);

  const getReCaptchaToken = async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      await loadReCaptchaScript();
    }

    return await window.grecaptcha!.execute(SITE_KEY, { action });
  };

  return { getReCaptchaToken, loadReCaptchaScript, removeReCaptchaScript };
};

export default useReCaptcha;
