import { useMutation } from "@sierra-madre/core-ts-sdk";
import { registerMutation } from "../generics/mutations";

type RegisterUserReturn = {
  registerUser: any;
  registerForm: any;
  registerCallLoading: boolean;
  registerCallError: any;
  registerFormInput: any;
  registerFormErrors: any;
  registerPartialValidation: any;
  setRegisterFormErrors: any;
  handleRegister: (
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void,
  ) => void;
};

const useRegisterUser = (): RegisterUserReturn => {
  const {
    mutate: registerUser,
    data: registerForm,
    isLoading: registerCallLoading,
    error: registerCallError,
    register: registerFormInput,
    errors: registerFormErrors,
    setErrors: setRegisterFormErrors,
    partialValidation: registerPartialValidation,
  } = useMutation(registerMutation);

  const handleRegister = (
    onSuccess?: (data: any) => void,
    onError?: (error: any) => void,
  ) => {
    registerUser({
      onSuccess: (data: any) => {
        onSuccess?.(data);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.message || error?.toString() || String(error);

        if (errorMessage.toLowerCase().includes("email")) {
          setRegisterFormErrors({
            ...(typeof registerFormErrors === "object" &&
            registerFormErrors !== null
              ? registerFormErrors
              : {}),
            email: [errorMessage],
          });
        }
        if (errorMessage.toLowerCase().includes("password")) {
          setRegisterFormErrors({
            ...(typeof registerFormErrors === "object" &&
            registerFormErrors !== null
              ? registerFormErrors
              : {}),
            password: [errorMessage],
          });
        }
        onError?.(error);
      },
    });
  };

  return {
    registerUser,
    registerForm,
    registerCallLoading,
    registerCallError,
    registerFormInput,
    registerFormErrors,
    registerPartialValidation,
    setRegisterFormErrors,
    handleRegister,
  };
};

export default useRegisterUser;
