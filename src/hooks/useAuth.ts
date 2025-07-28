import { useMutation, useRequest } from "@sierra-madre/core-ts-sdk"
import { refreshTokenMutation, logoutMutation, getCurrentUserMutation } from "../generics/mutations"

const useAuth = () => {
    const { mutate: refreshToken, data: refreshTokenData, isLoading: refreshTokenLoading, error: refreshTokenError, register: refreshTokenForm, errors: refreshTokenErrors, partialValidation: refreshTokenValidation } = useMutation(refreshTokenMutation)
    const { mutate: logout, data: logoutData, isLoading: logoutLoading, error: logoutError, register: logoutForm, errors: logoutErrors, partialValidation: logoutValidation } = useMutation(logoutMutation)
    const { data: getCurrentUserData, isLoading: getCurrentUserLoading, error: getCurrentUserError, query: getCurrentUserQuery} = useRequest(getCurrentUserMutation)
    // satate para guardar el acces token
    
    
    const validateRefresh = async () => {
        const res = await refreshToken()
        console.log(res, "res")
    }

    return { validateRefresh }
    
}

export default useAuth