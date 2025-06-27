import { changeLanguage, type Locale } from '@/lib/i18n';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';
import { getLocaleFromPath } from '@/plugins/i18n-routing.ts';
import AuthContextProvider from '@/provider/auth-context-provider.tsx';
// import { AuthGuard } from "@/components/common/auth-guard.tsx";
import type { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useEffect } from 'react';

/**
 * LocaleWrapper component that provides I18n context
 * Now uses react-i18next instead of custom provider
 */
export function LocaleWrapper({ children }: { children: ReactNode }) {
	const currentPath = window.location.pathname;
	const locale = getLocaleFromPath(currentPath);

	// Set language when locale changes
	useEffect(() => {
		if (locale) {
			changeLanguage(locale);
		}
	}, [locale]);

	return <>{children}</>;
}

/**
 * MainLayoutWrapper component with default layout and auth guard
 */
export function MainLayoutWrapper() {
	return (
		<LocaleWrapper>
			<AuthContextProvider>
				{/* <AuthGuard> */}
				<DefaultLayout />
				{/* </AuthGuard> */}
			</AuthContextProvider>
		</LocaleWrapper>
	);
}

/**
 * AuthLayoutWrapper component with auth layout
 */
export function AuthLayoutWrapper() {
	return (
		<LocaleWrapper>
			<AuthContextProvider>
				<AuthLayout />
			</AuthContextProvider>
		</LocaleWrapper>
	);
}

/**
 * RootRedirect component to handle locale redirect
 * Intelligently redirects users based on their auth status and preferences
 */
export function RootRedirect() {
	const preferredLocale =
		(localStorage.getItem('app-locale') as Locale) || 'uz';

	// Check if user is logged in
	const token = localStorage.getItem('accessToken');

	if (token) {
		// Logged-in user -> go to dashboard
		return <Navigate to={`/${preferredLocale}/reports`} replace />;
	}

	// Not logged in -> go to log in
	return <Navigate to={`/${preferredLocale}/auth/login`} replace />;
}
