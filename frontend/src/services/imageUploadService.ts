import { ImageUploadResponse } from "../types/ImageUploadResponse";
import { apiCall } from "../utils/apiUtils";

export const uploadImage = async (
  endpoint: string,
  formData: FormData
): Promise<ImageUploadResponse> => {
  const { data } = await apiCall<ImageUploadResponse>(endpoint, {
    method: "POST",
    body: formData,
  });

  return data;
};
