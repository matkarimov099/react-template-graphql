import {
	useGetUsers,
	useGetUserById,
	useCreateUser,
	useUpdateUser,
	useDeleteUser,
	useBulkDeleteUsers,
} from '../services/users.service';
import type { 
	UserFilterInput, 
	CreateUserInput, 
	UpdateUserInput 
} from '../graphql/users.graphql';

// Get users with filtering
export function useUsersData(filter: UserFilterInput) {
	const { data, loading, error, refetch } = useGetUsers(filter);
	
	return {
		users: data?.users.data || [],
		total: data?.users.total || 0,
		loading,
		error,
		refetch,
	};
}

// Get single user by ID
export function useUserData(id: string) {
	const { data, loading, error, refetch } = useGetUserById(id);
	
	return {
		user: data?.user,
		loading,
		error,
		refetch,
	};
}

// Create user operations
export function useCreateUserOperation() {
	const [createUserMutation, { loading, error }] = useCreateUser();
	
	const createUser = async (input: CreateUserInput) => {
		try {
			const result = await createUserMutation({
				variables: { input },
			});

			if (result.data?.createUser) {
				return {
					success: true,
					user: result.data.createUser,
				};
			}

			return {
				success: false,
				error: 'Failed to create user',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Failed to create user',
			};
		}
	};

	return {
		createUser,
		loading,
		error,
	};
}

// Update user operations
export function useUpdateUserOperation() {
	const [updateUserMutation, { loading, error }] = useUpdateUser();
	
	const updateUser = async (id: string, input: UpdateUserInput) => {
		try {
			const result = await updateUserMutation({
				variables: { id, input },
			});

			if (result.data?.updateUser) {
				return {
					success: true,
					user: result.data.updateUser,
				};
			}

			return {
				success: false,
				error: 'Failed to update user',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Failed to update user',
			};
		}
	};

	return {
		updateUser,
		loading,
		error,
	};
}

// Delete user operations
export function useDeleteUserOperation() {
	const [deleteUserMutation, { loading, error }] = useDeleteUser();
	
	const deleteUser = async (id: string) => {
		try {
			const result = await deleteUserMutation({
				variables: { id },
			});

			if (result.data?.deleteUser.success) {
				return {
					success: true,
					message: result.data.deleteUser.message,
				};
			}

			return {
				success: false,
				error: result.data?.deleteUser.message || 'Failed to delete user',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Failed to delete user',
			};
		}
	};

	return {
		deleteUser,
		loading,
		error,
	};
}

// Bulk delete users operations
export function useBulkDeleteUsersOperation() {
	const [bulkDeleteUsersMutation, { loading, error }] = useBulkDeleteUsers();
	
	const bulkDeleteUsers = async (ids: string[]) => {
		try {
			const result = await bulkDeleteUsersMutation({
				variables: { ids },
			});

			if (result.data?.bulkDeleteUsers.success) {
				return {
					success: true,
					message: result.data.bulkDeleteUsers.message,
					deletedCount: result.data.bulkDeleteUsers.deletedCount,
				};
			}

			return {
				success: false,
				error: result.data?.bulkDeleteUsers.message || 'Failed to delete users',
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Failed to delete users',
			};
		}
	};

	return {
		bulkDeleteUsers,
		loading,
		error,
	};
}

// Re-export individual service hooks for direct usage
export {
	useGetUsers,
	useGetUserById,
	useCreateUser,
	useUpdateUser,
	useDeleteUser,
	useBulkDeleteUsers,
} from '../services/users.service';
