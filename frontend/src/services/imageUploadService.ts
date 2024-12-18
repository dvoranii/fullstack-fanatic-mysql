import { ImageUploadResponse } from "../types/ImageUploadResponse";
import { apiCall } from "../utils/apiUtils";

const uploadImage = async (
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

export const uploadBannerImage = async (
  formData: FormData,
  csrfToken: string
) => {
  return uploadImage("/profile/upload-banner", formData, csrfToken);
};

export const uploadProfilePicture = async (
  formData: FormData,
  csrfToken: string
) => {
  return uploadImage("/profile/upload-profile-picture", formData, csrfToken);
};
