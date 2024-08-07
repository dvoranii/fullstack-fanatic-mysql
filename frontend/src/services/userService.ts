import { UserResponse } from "../types/UserResponse";

export const getUser = async (googleId: string): Promise<number> => {
  const response = await fetch(`/api/users?google_id=${googleId}`);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const userData: UserResponse = await response.json();
  return userData.user_id;
};
