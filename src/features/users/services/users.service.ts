import { useMutation, useQuery } from '@apollo/client';
import {
	GET_USERS_QUERY,
	GET_USER_BY_ID_QUERY,
	CREATE_USER_MUTATION,
	UPDATE_USER_MUTATION,
	DELETE_USER_MUTATION,
	BULK_DELETE_USERS_MUTATION,
	type UserFilterInput,
	type CreateUserInput,
	type UpdateUserInput,
	type UsersResponse,
	type UserResponse,
	type CreateUserResponse,
	type UpdateUserResponse,
	type DeleteUserResponse,
	type BulkDeleteUsersResponse,
} from '../graphql/users.graphql';

// Get users hook
export function useGetUsers(input: UserFilterInput) {
	return useQuery<UsersResponse, { input: UserFilterInput }>(GET_USERS_QUERY, {
		variables: { input },
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	});
}

// Get user by ID hook
export function useGetUserById(id: string) {
	return useQuery<UserResponse, { id: string }>(GET_USER_BY_ID_QUERY, {
		variables: { id },
		skip: !id,
		errorPolicy: 'all',
	});
}

// Create user hook
export function useCreateUser() {
	return useMutation<CreateUserResponse, { input: CreateUserInput }>(
		CREATE_USER_MUTATION,
		{
			refetchQueries: [GET_USERS_QUERY],
			awaitRefetchQueries: true,
			onError: (error) => {
				console.error('Create user error:', error);
			},
		},
	);
}

// Update user hook
export function useUpdateUser() {
	return useMutation<
		UpdateUserResponse,
		{ id: string; input: UpdateUserInput }
	>(UPDATE_USER_MUTATION, {
		refetchQueries: [GET_USERS_QUERY],
		awaitRefetchQueries: true,
		onError: (error) => {
			console.error('Update user error:', error);
		},
	});
}

// Delete user hook
export function useDeleteUser() {
	return useMutation<DeleteUserResponse, { id: string }>(
		DELETE_USER_MUTATION,
		{
			refetchQueries: [GET_USERS_QUERY],
			awaitRefetchQueries: true,
			onError: (error) => {
				console.error('Delete user error:', error);
			},
		},
	);
}

// Bulk delete users hook
export function useBulkDeleteUsers() {
	return useMutation<BulkDeleteUsersResponse, { ids: string[] }>(
		BULK_DELETE_USERS_MUTATION,
		{
			refetchQueries: [GET_USERS_QUERY],
			awaitRefetchQueries: true,
			onError: (error) => {
				console.error('Bulk delete users error:', error);
			},
		},
	);
}
