import { useMutation } from "@sierra-madre/core-ts-sdk"
import { loginMutation } from "../generics/mutations"
import { useState } from "react"

const useLogin = () => {
    const [loginErrors, setLoginErrors] = useState<Record<string, string[]>>({})

    const { 
        mutate: login, 
        data: loginData, 
        isLoading: loginLoading, 
        error: loginError, 
        register: loginForm, 
        errors: loginFormErrors, 
        partialValidation: loginPartialValidation 
    } = useMutation(loginMutation)

    const handleLogin = (onSuccess?: (data: any) => void, onError?: (error: Error) => void) => {
        login((data: any) => {
            console.log(data, "data")
            onSuccess?.(data)
        }, (error: Error) => {
            if (typeof error === "string" && error.toLowerCase().includes("email")) {
                setLoginErrors({...loginErrors, email: [error]})
            }
            onError?.(error)
        })
    }

    return { 
        login, 
        loginData, 
        loginLoading, 
        loginError, 
        loginForm, 
        loginFormErrors, 
        loginPartialValidation,
        loginErrors,
        setLoginErrors,
        handleLogin
    }
}

export default useLogin 