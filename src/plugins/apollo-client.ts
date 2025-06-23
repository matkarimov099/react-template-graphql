import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
	type NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { refreshToken } from '@/services/refresh-token';

const GRAPHQL_URL = import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4000/graphql';

// HTTP link for GraphQL requests
const httpLink = createHttpLink({
	uri: GRAPHQL_URL,
});

// Auth link to add authorization header
const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('accessToken');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

// Error link to handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
	if (graphQLErrors) {
		for (const { message, locations, path, extensions } of graphQLErrors) {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			);
			
			// Handle authentication errors
			if (extensions?.code === 'UNAUTHENTICATED' || extensions?.code === 'FORBIDDEN') {
				// Try to refresh token
				refreshToken().then((result) => {
					if (result?.accessToken) {
						// Retry the operation with new token
						return forward(operation);
					}
					// Redirect to login if refresh fails
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/auth/login';
				}).catch(() => {
					// Redirect to login on refresh error
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/auth/login';
				});
			}
		}
	}

	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		
		// Handle network errors (e.g., 401, 403)
		if ('statusCode' in networkError) {
			if (networkError.statusCode === 401) {
				// Try to refresh token on 401
				refreshToken().then((result) => {
					if (result?.accessToken) {
						return forward(operation);
					}
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/auth/login';
				}).catch(() => {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/auth/login';
				});
			}
		}
	}
});

// Retry link for failed requests
const retryLink = from([
	errorLink,
	authLink,
	httpLink,
]);

// Apollo Client instance
export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: retryLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					// Pagination policies
					users: {
						keyArgs: false,
						merge(existing, incoming) {
							const existingData = existing || { data: [], total: 0 };
							return {
								...incoming,
								data: [...existingData.data, ...incoming.data],
							};
						},
					},
				},
			},
		},
	}),
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'all',
			fetchPolicy: 'cache-and-network',
		},
		query: {
			errorPolicy: 'all',
			fetchPolicy: 'cache-first',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
});

export default apolloClient;
