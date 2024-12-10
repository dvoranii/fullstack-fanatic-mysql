import { apiCall } from "../utils/apiUtils";

export async function submitContactForm(
  fullName: string,
  email: string,
  message: string,
  csrfToken: string,
  recaptchaToken: string
) {
  return apiCall<{ message: string }>("/forms/contact", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ fullName, email, message, recaptchaToken }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}
