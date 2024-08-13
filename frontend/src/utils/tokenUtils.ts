import { jwtDecode, JwtPayload } from "jwt-decode";

export const handleTokenExpiration = (token: string, logOut: () => void) => {
  try {
    const decodedToken: JwtPayload = jwtDecode(token);

    const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;
    const timeUntilExpiration = expirationTime - Date.now();

    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        logOut();
      }, timeUntilExpiration);
    } else {
      logOut();
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    logOut();
  }
};
