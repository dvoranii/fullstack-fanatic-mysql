import { useState, useEffect } from "react";
import { fetchCsrfToken } from "../services/csrfService";

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await fetchCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.error("Failed to fetch CSRF token");
      }
    };

    getToken();
  }, []);

  return csrfToken;
};
