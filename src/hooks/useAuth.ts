import { useEffect } from "react";
import { getCurrentUserMutation } from "../generics/mutations"
import { useRequest } from "@sierra-madre/core-ts-sdk"

type CurrentUser = {
    user_id: string;
    name: string;
}

const useAuth = () => {

    
    const { data: currentUser, isLoading: currentUserLoading, error: currentUserError, query: getCurrentUser } = useRequest(getCurrentUserMutation, null)

    useEffect(() => {
        const fetchUser = async () => {
            const res = await getCurrentUser()        
            if(res?.data?.access_token){
                sessionStorage.setItem("sm-access-token", res.data.access_token)
                
            }
        }
        
        fetchUser()
            
    }, [])

    return {
        currentUser: currentUser as CurrentUser,
        currentUserLoading,
        currentUserError,
        getCurrentUser
    }

}

export default useAuth;

