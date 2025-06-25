import { gql } from '@apollo/client';

// Foydalanuvchilarni olish so'rovi
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

// Bitta foydalanuvchini olish so'rovi
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

// Foydalanuvchi statistikasini olish so'rovi
export const GET_USER_STATS_QUERY = gql`
  query GetUserStats {
    userStats {
      totalUsers
      activeUsers
      newUsersThisWeek
      newUsersThisMonth
    }
  }
`;

// Yangi foydalanuvchi yaratish mutatsiyasi
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      message
    }
  }
`;

// Foydalanuvchini o'zgartirish mutatsiyasi
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

// Foydalanuvchini o'chirish mutatsiyasi
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

// Ko'p foydalanuvchilarni o'chirish mutatsiyasi
export const BULK_DELETE_USERS_MUTATION = gql`
  mutation BulkDeleteUsers($ids: [ID!]!) {
    bulkDeleteUsers(ids: $ids) {
      success
      message
      deletedCount
    }
  }
`;
