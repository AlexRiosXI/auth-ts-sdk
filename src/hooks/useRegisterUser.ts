import { useMutation } from "@sierra-madre/core-ts-sdk"
import { registerMutation } from "../generics/mutations"
import { useState } from "react"

const useRegisterUser = () => {
    

    const { 
        mutate: registerUser, 
        data: registerForm, 
        isLoading: registerCallLoading,
        error: registerCallError, 
        register: registerFormInput, 
        errors: registerFormErrors, 
        partialValidation: registerPartialValidation 
    } = useMutation(registerMutation)

    const handleRegister = (onSuccess?: (data: any) => void, onError?: (error: Error) => void) => {
        registerUser((data: any) => {
            console.log(data, "data")
            onSuccess?.(data)
        }, (error: Error) => {
            if (typeof error === "string" && error.toLowerCase().includes("email")) {
                setRegisterFormErrors({...registerFormErrors, email: [error]})
            }
            if (typeof error === "string" && error.toLowerCase().includes("password")) {
                setRegisterFormErrors({...registerFormErrors, password: [error]})
            }
            onError?.(error)
        })
    }

    return { 
        registerUser, 
        registerForm, 
        registerCallLoading, 
        registerCallError, 
        registerFormInput, 
        registerFormErrors, 
        registerPartialValidation, 
        setRegisterFormErrors,
        handleRegister
    }
}

export default useRegisterUser