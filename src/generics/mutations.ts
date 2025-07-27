import {MutationRequest} from "@sierra-madre/core-ts-sdk"
import { registerSchema, loginSchema } from "./schemas"

// Predefined mutation for register user
export const registerMutation: MutationRequest = {
    baseUrl: 'http://localhost:5001',
    schema: registerSchema,
    path: '/auth/register',
    method: 'POST',
    body: {},
    params: {},
    query: {},
    responseType: 'json',
    timeout: 10000,
    contentType: 'application/json',
    succesfulStatusCode: 200
    
}

// Predefined mutation for login user
export const loginMutation: MutationRequest = {
    baseUrl: 'http://localhost:5001',
    schema: loginSchema,
    path: '/auth/login',
    method: 'POST',
    body: {},
    params: {},
    query: {},
    responseType: 'json',
    timeout: 10000,
    contentType: 'application/json',
    succesfulStatusCode: 200
    
}