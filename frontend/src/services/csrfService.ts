let csrfToken: string = "";

export const fetchCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/csrf`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }

    const data = await response.json();
    csrfToken = data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw error;
  }
};

export const clearCsrfToken = () => {
  csrfToken = "";
};
