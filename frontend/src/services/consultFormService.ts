import { apiCall } from "../utils/apiUtils";

export async function submitConsultationForm(
  name: string,
  email: string,
  message: string,
  csrfToken: string
) {
  return apiCall<{ message: string }>("/api/forms/consultation", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ name, email, message }),
    headers: {
      "x-csrf-token": csrfToken,
    },
  });
}
