import { useMutation, useRequest } from "@sierra-madre/core-ts-sdk"
import { refreshTokenMutation, logoutMutation, getCurrentUserMutation } from "../generics/mutations"

const useAuth = () => {
    const { mutate: refreshToken  } = useMutation(refreshTokenMutation)
    const { mutate: logout } = useMutation(logoutMutation)
    const { data: getAccessToken } = useRequest(getCurrentUserMutation)
    // satate para guardar el acces token

    
    const validateRefresh = async () => {
        const res = await refreshToken()
        console.log(res, "res")
    }

    return { validateRefresh }
    
}

export default useAuth