import { gql } from '@apollo/client';

// User Queries
export const GET_USERS_QUERY = gql`
	query GetUsers($input: UserFilterInput!) {
		users(input: $input) {
			data {
				id
				name
				email
				phone
				age
				created_at
				expense_count
				total_expenses
			}
			total
		}
	}
`;

export const GET_USER_BY_ID_QUERY = gql`
	query GetUserById($id: ID!) {
		user(id: $id) {
			id
			name
			email
			phone
			age
			created_at
			expense_count
			total_expenses
		}
	}
`;

// User Mutations
export const CREATE_USER_MUTATION = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			message
		}
	}
`;

export const UPDATE_USER_MUTATION = gql`
	mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
		updateUser(id: $id, input: $input) {
			id
			name
			email
			phone
			age
			created_at
			expense_count
			total_expenses
		}
	}
`;

export const DELETE_USER_MUTATION = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			success
			message
		}
	}
`;

export const BULK_DELETE_USERS_MUTATION = gql`
	mutation BulkDeleteUsers($ids: [ID!]!) {
		bulkDeleteUsers(ids: $ids) {
			success
			message
			deletedCount
		}
	}
`;

// Input Types
export interface UserFilterInput {
	limit?: number;
	page?: number;
	search?: string;
	from_date?: string;
	to_date?: string;
	sort_by?: string;
	sort_order?: 'asc' | 'desc';
}

export interface CreateUserInput {
	name: string;
	email: string;
	phone: string;
	age: number;
}

export interface UpdateUserInput {
	name?: string;
	email?: string;
	phone?: string;
	age?: number;
}

// Response Types
export interface User {
	id: string;
	name: string;
	email: string;
	phone: string;
	age: number;
	created_at: string;
	expense_count: number;
	total_expenses: string;
}

export interface UsersResponse {
	users: {
		data: User[];
		total: number;
	};
}

export interface UserResponse {
	user: User;
}

export interface CreateUserResponse {
	createUser: {
		id: string;
		message: string;
	};
}

export interface UpdateUserResponse {
	updateUser: User;
}

export interface DeleteUserResponse {
	deleteUser: {
		success: boolean;
		message: string;
	};
}

export interface BulkDeleteUsersResponse {
	bulkDeleteUsers: {
		success: boolean;
		message: string;
		deletedCount: number;
	};
}
