import { useMutation } from "@sierra-madre/core-ts-sdk"
import { registerMutation } from "../generics/mutations"

const useRegisterUser = () => {
    const { mutate: registerUser, data: registerForm, isLoading: registerCallLoading,
         error: registerCallError, register: registerFormInput, errors: registerFormErrors, partialValidation: registerPartialValidation, setErrors: setRegisterFormErrors } = useMutation(registerMutation)
    

    return { registerUser, registerForm, registerCallLoading, registerCallError, registerFormInput, registerFormErrors, registerPartialValidation, setRegisterFormErrors }
}

export default useRegisterUser