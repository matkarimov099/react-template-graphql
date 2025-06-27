export interface AuthToken {
	accessToken: string;
	refreshToken: string;
}

export interface LoginCredentials {
	phone: string;
	password: string;
}

export interface CurrentUser {
	id: string;
	phone: string;
	firstname: string;
	lastname: string;
	role: {
		id: string;
		name: string;
		privileges: string[];
	};
}

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
