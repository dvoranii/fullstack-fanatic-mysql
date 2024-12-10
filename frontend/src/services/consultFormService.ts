import { apiCall } from "../utils/apiUtils";

export async function submitConsultationForm(
  name: string,
  email: string,
  message: string,
  csrfToken: string,
  recaptchaToken: string
) {
  return apiCall<{ message: string }>("/forms/consultation", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name, email, message, recaptchaToken }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}
