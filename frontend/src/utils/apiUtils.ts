import { handleTokenExpiration } from "../services/tokenService";

const BASE_URL = "http://localhost:5000";

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ status: number; data: T }> {
  const token = await handleTokenExpiration();

  // Do not set Content-Type if the body is FormData (browser handles it)
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" }), // Only set Content-Type for non-FormData requests
    ...options.headers,
  };

  const fullUrl = `${BASE_URL}${endpoint}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const status = response.status;
  let data;

  // Handle JSON responses differently from FormData responses
  try {
    data = await response.json();
  } catch (error) {
    console.error("Error parsing response as JSON", error);
    throw new Error(`Failed to parse response from ${endpoint}`);
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${status}: ${data.message}`);
  }

  return { status, data };
}
