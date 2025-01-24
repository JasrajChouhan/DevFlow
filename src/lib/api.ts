import { fetchHandler } from "./hanlder/fetch";

import { getEnv } from "@/env";
import { IAccount } from "@/model/account.model";
import { IUser } from "@/model/user.model";

const isProduction = getEnv("NODE_ENV") === "production";

const API_BASE_URI = isProduction
  ? (getEnv("API_BASE_URI") as string)
  : "http://localhost:3000/api";

export const api = {
  users: {
    getAll: () => fetchHandler(`${API_BASE_URI}/users`),
    getById: (id: string) => fetchHandler(`${API_BASE_URI}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URI}/users/${email}`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URI}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URI}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),

    delete: (id: string) =>
      fetchHandler(`${API_BASE_URI}/users/${id}`, {
        method: "DELETE",
      }),
  },
  accounts: {
    getAll: () => fetchHandler(`${API_BASE_URI}/accounts`),
    getById: (id: string) => fetchHandler(`${API_BASE_URI}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_BASE_URI}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URI}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URI}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_BASE_URI}/accounts/${id}`, { method: "DELETE" }),
  },
};
