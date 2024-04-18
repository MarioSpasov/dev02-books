import { useMutation } from "react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

const useUserLogOut = () => {
  const authContext = useContext(AuthenticationContext);

  const logOutUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.API_LOGOUT_URL}`,

        {
          headers: {
            Authorization: `Bearer ${authContext.authData.token}`,
          },
          params: {
            username: authContext.authData.username,
            password: authContext.authData.password,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logOutUserMutation = useMutation(logOutUser);

  return {
    logOutUser: logOutUserMutation.mutateAsync,
    isLoading: logOutUserMutation.isLoading,
    error: logOutUserMutation.error,
    data: logOutUserMutation.data,
  };
};

const useUserLogOutWrapper = () => {
  return useUserLogOut();
};

export default useUserLogOutWrapper;
