import { ImageUploadResponse } from "../types/ImageUploadResponse";
import { apiCall } from "../utils/apiUtils";

export const uploadImage = async (
  endpoint: string,
  formData: FormData,
  csrfToken: string
): Promise<ImageUploadResponse> => {
  const { data } = await apiCall<ImageUploadResponse>(endpoint, {
    method: "POST",
    credentials: "include",
    body: formData,
    headers: {
      "x-csrf-token": csrfToken,
    },
  });

  return data;
};
