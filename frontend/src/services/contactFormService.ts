import { apiCall } from "../utils/apiUtils";

export async function submitContactForm(
  fullName: string,
  email: string,
  message: string
) {
  return apiCall<{ message: string }>("/api/forms/contact", {
    method: "POST",
    body: JSON.stringify({ fullName, email, message }),
  });
}
