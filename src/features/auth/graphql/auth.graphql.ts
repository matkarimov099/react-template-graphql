import { gql } from '@apollo/client';

// Authentication Queries & Mutations
export const LOGIN_MUTATION = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			accessToken
			refreshToken
			user {
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

// Input Types
export interface LoginInput {
	phone: string;
	password: string;
}

// Response Types
export interface LoginResponse {
	login: {
		accessToken: string;
		refreshToken: string;
		user: {
			id: string;
			phone: string;
			firstname: string;
			lastname: string;
			role: {
				id: string;
				name: string;
				privileges: string[];
			};
		};
	};
}

export interface LogoutResponse {
	logout: {
		success: boolean;
		message: string;
	};
}

export interface RefreshTokenResponse {
	refreshToken: {
		accessToken: string;
		refreshToken: string;
	};
}

export interface CurrentUserResponse {
	me: {
		id: string;
		phone: string;
		firstname: string;
		lastname: string;
		role: {
			id: string;
			name: string;
			privileges: string[];
		};
	};
}
