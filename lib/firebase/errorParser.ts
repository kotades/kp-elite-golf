export const parseFirebaseError = (error: any): { title: string; message: string } => {
  const code = error?.code || "";
  
  switch (code) {
    case "auth/configuration-not-found":
      return {
        title: "Registration Unavailable",
        message: "Email registration is currently disabled by the server administrator. Please contact support.",
      };
    case "auth/email-already-in-use":
      return {
        title: "Account Exists",
        message: "An account with this email address already exists. Please sign in instead.",
      };
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return {
        title: "Invalid Credentials",
        message: "The email or password you entered is incorrect. Please try again.",
      };
    case "auth/too-many-requests":
      return {
        title: "Account Temporarily Locked",
        message: "Too many failed login attempts. Please try again later or reset your password.",
      };
    case "auth/weak-password":
      return {
        title: "Weak Password",
        message: "Your password must be at least 6 characters long and include a mix of letters and numbers.",
      };
    case "auth/network-request-failed":
      return {
        title: "Network Error",
        message: "Unable to connect to the authentication server. Please check your internet connection.",
      };
    default:
      return {
        title: "Authentication Error",
        message: error?.message?.replace("Firebase: ", "") || "An unexpected error occurred during authentication.",
      };
  }
};
