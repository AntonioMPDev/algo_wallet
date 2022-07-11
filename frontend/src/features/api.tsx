import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, Transaction } from "../model/models"
import Storage from "../utils/storage";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  token: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_DOMAIN}/api`,
    // header with token
    prepareHeaders: (headers) => {
      const token = new Storage().get("token") || "";
      if (token) {
        headers.set('authorization', "Bearer " + token)
      }
  
      return headers
    },
  }),
  tagTypes: ["Data", "User"],
  endpoints: (builder) => ({
    // Auth apis
    getMe: builder.query<User, {}>({
      query: () => ({
        url: 'auth/me',
        method: 'GET',
        validateStatus: (response, result) => {
          if(response.status === 401) {
            new Storage().clear();
          } else {
            return result
          }
        }
      }),
      providesTags: ["Data"],
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
        validateStatus: (response, result) =>  {
          if(response.status === 200) {
            new Storage().save("token", result.token)
            return result.token
          }
        }
      }),
      invalidatesTags: ["User", "Data"]
    }),
    signUp: builder.mutation<UserResponse, LoginRequest>({
      query: (data) => ({
        url: 'auth/signup',
        method: 'POST',
        body: data,
        validateStatus: (response, result) =>  {
          if(response.status === 200) {
            return result
          }
        }
      }),
    }),
    // transactions api
    getTransactions: builder.query<Transaction[], {}>({
      query: (id) => `transactions/user/${id}`,
      providesTags: ["Data"],
    }),
    transfer: builder.mutation<Transaction, {}>({
      query: (data) => ({
        url: 'transactions',
        method: 'POST',
        body: data,
        validateStatus: (response, result) =>  {
          if(response.status === 200) {
            return result
          }
        }
      }),
      invalidatesTags: ["Data"]
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetTransactionsQuery,
  useTransferMutation,
  useLoginMutation,
  useSignUpMutation
} = api;
