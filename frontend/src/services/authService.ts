import { JwtPayload, jwtDecode } from "jwt-decode";

const getAuthToken = () => localStorage.getItem("authToken");

const setAuthToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

const refreshJwt = async () => {
  try {
    const response = await fetch("/refresh-token", {
      method: "POST",
      credentials: "include", // Ensures cookies are sent with the request
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    const { token } = data;

    setAuthToken(token);
    return token;
  } catch (error) {
    console.error("Error refreshing JWT:", error);
    throw error;
  }
};

const isTokenExpired = (token: string) => {
  const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

  if (!decoded.exp) {
    return true;
  }
  return decoded.exp * 1000 < Date.now();
};

const handleTokenExpiration = async () => {
  let token = getAuthToken();
  if (!token || isTokenExpired(token)) {
    token = await refreshJwt();
  }
  return token;
};

export { getAuthToken, setAuthToken, refreshJwt, handleTokenExpiration };
