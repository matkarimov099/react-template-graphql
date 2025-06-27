import { gql } from '@apollo/client';

// Authentication Queries & Mutations
export const LOGIN_MUTATION = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			accessToken
			refreshToken
		}
	}
`;

export const LOGOUT_MUTATION = gql`
	mutation Logout {
		logout {
			success
			message
		}
	}
`;

export const REFRESH_TOKEN_MUTATION = gql`
	mutation RefreshToken {
		refreshToken {
			accessToken
			refreshToken
		}
	}
`;

export const GET_CURRENT_USER_QUERY = gql`
	query GetCurrentUser {
		me {
			id
			phone
			firstname
			lastname
			role {
				id
				name
				privileges
			}
		}
	}
`;

