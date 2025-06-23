import { useLogin, useLogout, useCurrentUser, useRefreshToken } from '../services/auth.service';
import type { LoginInput } from '../graphql/auth.graphql';

// Auth hooks for authentication operations
export function useAuthOperations() {
	const { data: currentUserData, loading: userLoading, error: userError } = useCurrentUser();
	const [loginMutation, { loading: loginLoading, error: loginError }] = useLogin();
	const [logoutMutation, { loading: logoutLoading }] = useLogout();
	const [refreshTokenMutation, { loading: refreshLoading }] = useRefreshToken();

	const login = async (credentials: LoginInput) => {
		try {
			const result = await loginMutation({
				variables: {
					input: credentials,
				},
			});

			if (result.data?.login.accessToken) {
				// Tokens are automatically saved in the mutation hook
				return {
					success: true,
					user: result.data.login.user,
					tokens: {
						accessToken: result.data.login.accessToken,
						refreshToken: result.data.login.refreshToken,
					},
				};
			}
			
			return {
				success: false,
				error: 'Login failed',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Login failed',
			};
		}
	};

	const logout = async () => {
		try {
			await logoutMutation();
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Logout failed',
			};
		}
	};

	const refreshToken = async () => {
		try {
			const refreshToken = localStorage.getItem('refreshToken');
			if (!refreshToken) {
				throw new Error('No refresh token available');
			}

			const result = await refreshTokenMutation({
				variables: {
					input: { refreshToken },
				},
			});

			if (result.data?.refreshToken.accessToken) {
				return {
					success: true,
					tokens: {
						accessToken: result.data.refreshToken.accessToken,
						refreshToken: result.data.refreshToken.refreshToken,
					},
				};
			}

			return {
				success: false,
				error: 'Token refresh failed',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Token refresh failed',
			};
		}
	};

	return {
		// Data
		currentUser: currentUserData?.me,
		
		// Loading states
		isUserLoading: userLoading,
		isLoginLoading: loginLoading,
		isLogoutLoading: logoutLoading,
		isRefreshLoading: refreshLoading,
		
		// Errors
		userError,
		loginError,
		
		// Operations
		login,
		logout,
		refreshToken,
	};
}

// Re-export individual hooks for direct usage
export { useLogin, useLogout, useCurrentUser, useRefreshToken } from '../services/auth.service';
