// export const fetchCsrfToken = async (): Promise<string> => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/csrf`, {
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return data.csrfToken;
//     } else {
//       console.error("Failed to fetch CSRF token");
//       throw new Error("Failed to fetch CSRF token");
//     }
//   } catch (error) {
//     console.error("Error fetching CSRF token:", error);
//     throw error;
//   }
// };
