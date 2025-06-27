import {useMutation, useQuery} from "@apollo/client";
import type {CurrentUserResponse, LoginInput, LoginResponse} from "@/features/auth/types.ts";
import {GET_CURRENT_USER_QUERY, LOGIN_MUTATION, LOGOUT_MUTATION} from "@/features/auth/graphql/auth.graphql.ts";

export function useLogin() {
	const [loginMutation, {loading, error, data}] = useMutation<LoginResponse, {input: LoginInput}>(LOGIN_MUTATION, {
		onCompleted: (data) => {
			// Token saqlash
			if (data.login.accessToken) {
				localStorage.setItem('accessToken', data.login.accessToken);
				localStorage.setItem('refreshToken', data.login.refreshToken);
			}
		},
		onError: (error) => {
			console.error("Login error:", error);
		}
	})
	return {
		login: loginMutation,
		loading,
		error,
		data
	};
}

export function  useLogout() {
	const [logoutMutation, {loading, error, data}] = useMutation(LOGOUT_MUTATION, {
		onCompleted: () => {
			// Tokenlarni o'chirish
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		},
		onError: (error) => {
			console.error("Logout error:", error);
		}
	});
	return {
		logout: logoutMutation,
		loading,
		error,
		data
	};
}

//create useGetCurrentUser hook query
export function useGetCurrentUser(){
	return useQuery<CurrentUserResponse>(GET_CURRENT_USER_QUERY, {
		fetchPolicy: "cache-and-network",
		errorPolicy: "all",
		skip: !localStorage.getItem('accessToken'), // Token yo'q bo'lsa skip qilish
	});
}