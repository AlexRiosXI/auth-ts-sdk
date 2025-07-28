import { useMutation } from "@sierra-madre/core-ts-sdk"
import { loginMutation } from "../generics/mutations"


const useLogin = () => {
    

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
        sessionStorage.setItem("sm-refresh-token", "perro")
        login((data: any) => {
            sessionStorage.setItem("sm-access-token", data.access_token)
            onSuccess?.(data)
        }, (error: any) => {
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