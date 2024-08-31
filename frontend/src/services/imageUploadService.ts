import { ImageUploadResponse } from "../types/ImageUploadResponse";
import { handleTokenExpiration } from "./tokenService";

export const uploadImage = async (
  endpoint: string,
  formData: FormData
): Promise<ImageUploadResponse> => {
  try {
    const token = await handleTokenExpiration();

    if (!token) {
      throw new Error("User not authenticated");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data: ImageUploadResponse = await response.json();
    console.log("Upload response from server:", data);
    return data;
  } catch (error) {
    console.error("Error in uploadImage function:", error);
    throw error;
  }
};
