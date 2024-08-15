import { JwtPayload, jwtDecode } from "jwt-decode";
import { refreshJwt as apiRefreshJwt } from "../api/api";

const getAuthToken = () => localStorage.getItem("accessToken");

const setAuthToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const refreshJwt = async () => {
  try {
    const data = await apiRefreshJwt();
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
    console.log("token expired...called");
    token = await refreshJwt();
  }
  return token;
};

export { getAuthToken, setAuthToken, handleTokenExpiration };
