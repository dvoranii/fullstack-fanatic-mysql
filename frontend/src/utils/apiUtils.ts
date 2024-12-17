import { handleTokenExpiration } from "../services/tokenService";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ status: number; data: T }> {
  const token = (await handleTokenExpiration()) as string | null;

  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...options.headers,
  };

  const fullUrl = `${BASE_URL}${endpoint}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const status = response.status;
  let data;

  try {
    data = await response.json();
  } catch (error) {
    console.error("Error parsing response as JSON", error);
    throw new Error(`Failed to parse response from ${endpoint}`);
  }

  if (!response.ok) {
    const errorMessage =
      data.message || data.error || `Request failed with status ${status}`;
    throw new Error(errorMessage);
  }

  return { status, data };
}
