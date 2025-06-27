import {
	createContext,
	useEffect,
	useMemo,
	useState,
	type PropsWithChildren,
} from 'react';
import { useGetCurrentUser } from '@/features/auth/hooks/use-auth';
import type { CurrentUser } from '@/features/auth/types';

interface AuthContextValue {
	user: CurrentUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
	undefined,
);

export default function AuthContextProvider({ children }: PropsWithChildren) {
	const [user, setUser] = useState<CurrentUser | null>(null);
	const { data: currentUserData, loading: isUserLoading } = useGetCurrentUser();

	useEffect(() => {
		setUser(currentUserData?.me || null);
	}, [currentUserData]);

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading: isUserLoading,
		}),
		[user, isUserLoading],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
