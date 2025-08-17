import { useMutation } from "@sierra-madre/core-ts-sdk";
import { logoutMutation } from "../generics/mutations";

const useLogout = () => {
  const {
    mutate: logout,
    isLoading: logoutLoading,
    error: logoutError,
  } = useMutation(logoutMutation);

  return { logout, logoutLoading, logoutError };
};

export default useLogout;
