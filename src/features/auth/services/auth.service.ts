import { useMutation, useQuery } from '@apollo/client';
import {
	LOGIN_MUTATION,
	LOGOUT_MUTATION,
	REFRESH_TOKEN_MUTATION,
	GET_CURRENT_USER_QUERY,
	type LoginInput,
	type LoginResponse,
	type LogoutResponse,
	type RefreshTokenResponse,
	type CurrentUserResponse,
} from '../graphql/auth.graphql';

// Login hook
export function useLogin() {
	return useMutation<LoginResponse, { input: LoginInput }>(LOGIN_MUTATION, {
		onCompleted: (data) => {
			if (data.login.accessToken) {
				localStorage.setItem('accessToken', data.login.accessToken);
				localStorage.setItem('refreshToken', data.login.refreshToken);
			}
		},
		onError: (error) => {
			console.error('Login error:', error);
		},
	});
}

// Logout hook
export function useLogout() {
	return useMutation<LogoutResponse>(LOGOUT_MUTATION, {
		onCompleted: () => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			// Redirect to login page
			window.location.href = '/auth/login';
		},
		onError: (error) => {
			console.error('Logout error:', error);
			// Clear tokens even if logout fails
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
	});
}

// Refresh token hook
export function useRefreshToken() {
	return useMutation<RefreshTokenResponse>(REFRESH_TOKEN_MUTATION, {
		onCompleted: (data) => {
			if (data.refreshToken.accessToken) {
				localStorage.setItem('accessToken', data.refreshToken.accessToken);
				localStorage.setItem('refreshToken', data.refreshToken.refreshToken);
			}
		},
		onError: () => {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			window.location.href = '/auth/login';
		},
	});
}

// Current user hook
export function useCurrentUser() {
	return useQuery<CurrentUserResponse>(GET_CURRENT_USER_QUERY, {
		skip: !localStorage.getItem('accessToken'),
		errorPolicy: 'all',
		onError: (error) => {
			console.error('Current user error:', error);
		},
	});
}
