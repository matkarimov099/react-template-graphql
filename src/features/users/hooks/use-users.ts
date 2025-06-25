import { useMutation, useQuery } from '@apollo/client';
import {
	BULK_DELETE_USERS_MUTATION,
	CREATE_USER_MUTATION,
	DELETE_USER_MUTATION,
	GET_USERS_QUERY,
	GET_USER_BY_ID_QUERY,
	UPDATE_USER_MUTATION,
	GET_USER_STATS_QUERY,
} from '../graphql/users.graphql';
import type {
	CreateUserInput,
	UpdateUserInput,
	UserFilterInput,
	BulkDeleteUsersResponse,
	CreateUserResponse,
	DeleteUserResponse,
	UpdateUserResponse,
	UserResponse,
	UsersResponse,
	UserStatsResponse,
} from '../types';

// Foydalanuvchilarni olish uchun hook
export function useGetUsers(input: UserFilterInput) {
	return useQuery<UsersResponse, { input: UserFilterInput }>(GET_USERS_QUERY, {
		variables: { input },
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	});
}

// Bitta foydalanuvchini olish uchun hook
export function useGetUserById(id: string) {
	return useQuery<UserResponse, { id: string }>(GET_USER_BY_ID_QUERY, {
		variables: { id },
		skip: !id,
		errorPolicy: 'all',
	});
}

// Foydalanuvchi statistikasini olish uchun hook
export function useGetUserStats() {
	return useQuery<UserStatsResponse>(GET_USER_STATS_QUERY, {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'all',
	});
}

// Yangi foydalanuvchi yaratish uchun hook
export function useCreateUser() {
	const [createUserMutation, result] = useMutation<CreateUserResponse, { input: CreateUserInput }>(
		CREATE_USER_MUTATION,
		{
			refetchQueries: [{ query: GET_USERS_QUERY, variables: { input: {} } }],
			awaitRefetchQueries: true,
			onError: (error) => {
				console.error('Create user error:', error);
			},
		}
	);

	return {
		createUser: createUserMutation,
		loading: result.loading,
		error: result.error,
		data: result.data,
	};
}

// Foydalanuvchini o'zgartirish uchun hook
export function useUpdateUser() {
	const [updateUserMutation, result] = useMutation<UpdateUserResponse, { id: string; input: UpdateUserInput }>(
		UPDATE_USER_MUTATION,
		{
			refetchQueries: [{ query: GET_USERS_QUERY, variables: { input: {} } }],
			awaitRefetchQueries: true,
		}
	);

	return {
		updateUser: updateUserMutation,
		loading: result.loading,
		error: result.error,
		data: result.data,
	};
}

// Foydalanuvchini o'chirish uchun hook
export function useDeleteUser() {
	const [deleteUserMutation, result] = useMutation<DeleteUserResponse, { id: string }>(
		DELETE_USER_MUTATION,
		{
			refetchQueries: [{ query: GET_USERS_QUERY, variables: { input: {} } }],
			awaitRefetchQueries: true,
		}
	);

	return {
		deleteUser: deleteUserMutation,
		loading: result.loading,
		error: result.error,
		data: result.data,
		success:result
	};
}

// Ko'p foydalanuvchilarni o'chirish uchun hook
export function useBulkDeleteUsers() {
	const [bulkDeleteUsersMutation, result] = useMutation<BulkDeleteUsersResponse, { ids: string[] }>(
		BULK_DELETE_USERS_MUTATION,
		{
			refetchQueries: [{ query: GET_USERS_QUERY, variables: { input: {} } }],
			awaitRefetchQueries: true,
		}
	);

	return {
		bulkDeleteUsers: bulkDeleteUsersMutation,
		loading: result.loading,
		error: result.error,
		data: result.data,
	};
}
