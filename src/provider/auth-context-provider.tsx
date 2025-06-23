import { AuthContext } from "@/context/auth-context";
import { useAuthOperations } from "@/features/auth/hooks/use-auth";
import type { CurrentUser } from "@/features/auth/types.ts";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type AuthContextProviderProps = PropsWithChildren;

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();

  // Use GraphQL hooks
  const {
    currentUser,
    isUserLoading,
    isLoginLoading,
    isLogoutLoading,
    userError,
    login: loginOperation,
    logout: logoutOperation,
  } = useAuthOperations();

  const logout = async () => {
    try {
      const result = await logoutOperation();
      if (result.success) {
        setAuthToken(null);
        toast.success("Successfully logged out");
        navigate("/auth/login");
      } else {
        toast.error(result.error || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed");
    }
  };

  const login = async (credentials: { phone: string; password: string }) => {
    try {
      const result = await loginOperation(credentials);
      if (result.success && result.tokens) {
        setAuthToken(result.tokens.accessToken);
        toast.success("Successfully logged in");
        return result;
      }
      toast.error(result.error || "Login failed");
      return result;
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
      return { success: false, error: "Login failed" };
    }
  };

  // Update auth token when user data changes
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAuthToken(token);
  }, []);

  // Handle GraphQL errors
  useEffect(() => {
    if (userError) {
      console.error("Auth GraphQL error:", userError);
      // Handle specific error cases
      if (
        userError.message.includes("UNAUTHENTICATED") ||
        userError.message.includes("FORBIDDEN")
      ) {
        setAuthToken(null);
        navigate("/auth/login");
      }
    }
  }, [userError, navigate]);

  const contextValue = {
    authToken,
    currentUser: currentUser as CurrentUser | null,
    login,
    logout,
    isAuthenticated: !!currentUser,
    loading: isUserLoading || isLoginLoading || isLogoutLoading,
    error: userError,
    // Compatibility with existing context interface
    isLoading: isUserLoading || isLoginLoading || isLogoutLoading,
    isSuccessLogout: false, // You can track this if needed
    isErrorLogout: !!userError,
    isLoggedIn: !!currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContextProvider };
