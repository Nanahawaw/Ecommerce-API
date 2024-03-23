import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/signout`,
        method: "GET",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
} = userApiSlice;
