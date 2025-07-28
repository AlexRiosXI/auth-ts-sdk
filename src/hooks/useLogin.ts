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

    const handleLogin = (onSuccess?: (data: any) => void, onError?: (error: Error) => void) => {
        login((data: any) => {
            console.log(data, "data")
            onSuccess?.(data)
        }, (error: Error) => {
            if (typeof error === "string" && (error.toLowerCase().includes("email")) || (error.toLowerCase().includes("user"))) {
                setLoginFormErrors({...loginFormErrors, email: [error]})
            }else if (typeof error === "string" && error.toLowerCase().includes("password")) {
                setLoginFormErrors({...loginFormErrors, password: [error]})
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