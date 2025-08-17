import { useMutation } from "@sierra-madre/core-ts-sdk"
import { loginMutation } from "../generics/mutations"

type LoginReturn = {
    login: any;
    loginForm: any;
    loginLoading: boolean;
    loginError: any;
    registerLoginInput: any;
    loginFormErrors: any;
    loginPartialValidation: any;
    setLoginFormErrors: any;
    handleLogin: (onSuccess?: (data: any) => void, onError?: (error: any) => void) => void;
}

const useLogin = (): LoginReturn => {
    

    const { 
        mutate: login, 
        data: loginForm, 
        isLoading: loginLoading, 
        error: loginError, 
        register: registerLoginInput, 
        errors: loginFormErrors, 
        partialValidation: loginPartialValidation,
        setErrors: setLoginFormErrors,
    } = useMutation(loginMutation)

    const handleLogin = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
        login({
            onSuccess: (data: any) => {
                sessionStorage.setItem("sm-access-token", data.access_token)
                onSuccess?.(data)
            },
            onError: (error: any) => {
                const errorMessage = error?.message || error?.toString() || String(error)
                
                if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("user")) {
                    setLoginFormErrors({
                        ...(typeof loginFormErrors === "object" && loginFormErrors !== null ? loginFormErrors : {}),
                        email: [errorMessage]
                    })
                } else if (errorMessage.toLowerCase().includes("password")) {
                    setLoginFormErrors({
                        ...(typeof loginFormErrors === "object" && loginFormErrors !== null ? loginFormErrors : {}),
                        password: [errorMessage]
                    })
                }
                onError?.(error)
            }
        })
    }

    

    return { 
        login, 
        loginForm, 
        loginLoading, 
        loginError, 
        registerLoginInput, 
        loginFormErrors, 
        loginPartialValidation,
        setLoginFormErrors,
        handleLogin
    }
}

export default useLogin 