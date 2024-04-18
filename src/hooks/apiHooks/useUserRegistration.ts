import { useMutation } from "react-query";
import axios from "axios";
import { RegisterProps } from "../../InterfacesTypesEnums/RegisterTypes";

const useRegistration = () => {
  const registerUserMutation = useMutation(
    async ({ username, password }: RegisterProps) => {
      try {
        const response = await axios.post(`${process.env.API_REGISTER_URL}`, {
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
    registerUser: registerUserMutation.mutateAsync,
    isLoading: registerUserMutation.isLoading,
    error: registerUserMutation.error,
    data: registerUserMutation.data,
  };
};

export default useRegistration;
