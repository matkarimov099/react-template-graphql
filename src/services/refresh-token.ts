import { apolloClient } from '@/plugins/apollo-client';
import { REFRESH_TOKEN_MUTATION, type RefreshTokenResponse } from '@/features/auth/graphql/auth.graphql';

export async function refreshToken() {
	try {
		const refreshToken = localStorage.getItem('refreshToken');
		if (!refreshToken) {
			console.log('No refresh token found in localStorage');
			return null;
		}

		const result = await apolloClient.mutate<RefreshTokenResponse>({
			mutation: REFRESH_TOKEN_MUTATION,
			context: {
				headers: {
					authorization: `Bearer ${refreshToken}`,
				},
			},
		});

		const session = result?.data?.refreshToken;
		if (!session?.accessToken) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			return null;
		}

		localStorage.setItem('accessToken', session.accessToken);
		localStorage.setItem('refreshToken', session.refreshToken);
		
		return {
			accessToken: session.accessToken,
			refreshToken: session.refreshToken,
		};
	} catch (error: unknown) {
		console.error('Refresh token error:', error);
		
		// Clear tokens and redirect to log in
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		
		// Check if it's a GraphQL error with specific error codes
		if (isGraphQLError(error)) {
			if (error.graphQLErrors?.some(e => 
				e.extensions?.code === 'UNAUTHENTICATED' || 
				e.extensions?.code === 'FORBIDDEN'
			)) {
				alert('Your session has expired!');
				window.location.href = '/auth/login';
			}
		} else if (isNetworkError(error)) {
			if (error.networkError?.statusCode === 403) {
				alert('Your session has expired!');
				window.location.href = '/auth/login';
			}
		}
		
		return null;
	}
}

function isGraphQLError(
	error: unknown,
): error is { graphQLErrors: Array<{ extensions?: { code?: string } }> } {
	return (
		typeof error === 'object' && 
		error !== null && 
		'graphQLErrors' in error &&
		Array.isArray((error as { graphQLErrors: unknown }).graphQLErrors)
	);
}

function isNetworkError(
	error: unknown,
): error is { networkError: { statusCode: number } } {
	return (
		typeof error === 'object' && 
		error !== null && 
		'networkError' in error &&
		typeof (error as { networkError: unknown }).networkError === 'object' &&
		'statusCode' in (error as { networkError: { statusCode: unknown } }).networkError
	);
}
