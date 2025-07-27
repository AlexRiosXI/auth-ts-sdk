import { useMutation } from "@sierra-madre/core-ts-sdk"
import { registerMutation, loginMutation } from "../generics/mutations"

const useAuth = () => {
    const { mutate: register, data: registerData, isLoading: registerLoading, error: registerError, register: registerForm, errors: registerErrors, partialValidation: registerValidation } = useMutation(registerMutation)
    const { mutate: login, data: loginData, isLoading: loginLoading, error: loginError, register: loginForm, errors: loginErrors, partialValidation: loginValidation } = useMutation(loginMutation)

    return { register, login, registerData, loginData, registerLoading, loginLoading, registerError, loginError, registerForm, loginForm, registerErrors, loginErrors, registerValidation, loginValidation }
}

export default useAuth