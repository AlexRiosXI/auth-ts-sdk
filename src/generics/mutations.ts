import { MutationRequest, Request } from "@sierra-madre/core-ts-sdk";
import { registerSchema, loginSchema, emptySchema } from "./schemas";

// Predefined mutation for register user
export const registerMutation: MutationRequest = {
  baseUrl: "https://localhost:5001",
  schema: registerSchema,
  path: "/auth/register",
  method: "POST",
  body: {},
  params: {},
  query: {},
  responseType: "json",
  timeout: 10000,
  contentType: "application/json",
  succesfulStatusCode: 200,
};

// Predefined mutation for login user
export const loginMutation: MutationRequest = {
  baseUrl: "https://localhost:5001",
  schema: loginSchema,
  path: "/auth/login",
  method: "POST",
  body: {},
  params: {},
  query: {},
  responseType: "json",
  timeout: 10000,
  contentType: "application/json",
  succesfulStatusCode: 200,
};

export const refreshTokenMutation: MutationRequest = {
  baseUrl: "https://localhost:5001",
  schema: emptySchema,
  path: "/auth/refresh-token",
  method: "POST",
  body: {},
  params: {},
  query: {},
  responseType: "json",
  timeout: 10000,
  contentType: "application/json",
  succesfulStatusCode: 200,
};

export const logoutMutation: MutationRequest = {
  baseUrl: "https://localhost:5001",
  schema: emptySchema,
  path: "/auth/logout",
  method: "POST",
  body: {},
  params: {},
  query: {},
  responseType: "json",
  timeout: 10000,
  contentType: "application/json",
  succesfulStatusCode: 200,
};

export const getCurrentUserMutation: Request = {
  baseUrl: "https://localhost:5001",
  path: "/auth/me",
  method: "GET",
  body: {},
  params: {},
  query: {},
  responseType: "json",
  timeout: 10000,
  contentType: "application/json",
};
