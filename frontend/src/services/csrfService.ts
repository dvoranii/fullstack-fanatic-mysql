import { apiCall } from "../utils/apiUtils";

let csrfToken: string = "";

export const fetchCsrfToken = async (): Promise<string> => {
  if (csrfToken) {
    return csrfToken;
  }

  try {
    const { data } = await apiCall<{ csrfToken: string }>("/csrf", {
      method: "GET",
      credentials: "include",
      headers: {},
    });

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
