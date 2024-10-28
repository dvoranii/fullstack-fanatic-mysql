import { apiCall } from "../utils/apiUtils";

export async function submitConsultationForm(
  name: string,
  email: string,
  message: string
) {
  return apiCall<{ message: string }>("/api/forms/consultation", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  });
}
