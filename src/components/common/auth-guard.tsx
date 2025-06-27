import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthContext } from '@/hooks/use-auth-context';
import { Spinner } from '../ui/spinner';

export function AuthGuard({ children }: PropsWithChildren) {
	const { user, isLoading } = useAuthContext();
	const location = useLocation();

	// Hali yuklanayotgan bo'lsa, loading ko'rsatish
	if (isLoading) {
		return <Spinner />;
	}
	// If the user is not authenticated, redirect to login page
	// and save the current location so we can redirect back after login
	if (!user) {
		return (
			<Navigate
				to="/auth/login"
				state={{ from: { pathname: location.pathname } }}
				replace
			/>
		);
	}

	// If the user is authenticated, render the children components
	// This allows the user to access the protected routes
	// without being redirected again
	return <>{children}</>;
}
