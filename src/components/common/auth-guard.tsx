import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "@/hooks/use-auth-context";

export function AuthGuard({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuthContext();
  const location = useLocation();

  // Hali yuklanayotgan bo'lsa, loading ko'rsatish
  if (isLoading) {
    return <div>Loading...</div>; // Yoki sizning loading component
  }

  // Agar foydalanuvchi login qilmagan bo'lsa, login sahifasiga yo'naltirish
  // va qayerdan kelganini saqlash
  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: { pathname: location.pathname } }}
        replace
      />
    );
  }

  // Agar login qilgan bo'lsa, children'ni ko'rsatish
  return <>{children}</>;
}
