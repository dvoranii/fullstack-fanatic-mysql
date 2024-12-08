import { apiCall } from "../utils/apiUtils";

export async function submitContactForm(
  fullName: string,
  email: string,
  message: string,
  csrfToken: string
) {
  return apiCall<{ message: string }>("/forms/contact", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ fullName, email, message }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}
