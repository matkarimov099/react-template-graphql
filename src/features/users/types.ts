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

export interface UserCreate {
	name: string;
	email: string;
	phone: string;
	age: number;
}

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

/**
 * User statistics interface
 */
export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
}

/**
 * Response for user statistics query
 */
export interface UserStatsResponse {
    userStats: UserStats;
}
