import { useMutation } from "react-query";
import axios from "axios";
import { LogInProps } from "../../InterfacesTypesEnums/RegisterTypes";

const useUserLogIn = () => {
  const logInUserMutation = useMutation(
    async ({ username, password }: LogInProps) => {
      try {
        const response = await axios.post(`${process.env.API_LOGIN_URL}`, {
          username,
          password,
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  return {
    logInUser: logInUserMutation.mutateAsync,
    isLoading: logInUserMutation.isLoading,
    error: logInUserMutation.error,
    data: logInUserMutation.data,
  };
};

export default useUserLogIn;
