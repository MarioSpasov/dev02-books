import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import axios from "axios";
import { useQuery } from "react-query";

const useFetchAllBooks = () => {
  const authContext = useContext(AuthenticationContext);

  const { data, isLoading, error } = useQuery("books", async () => {
    try {
      const response = await axios.get(process.env.API_GET_ALL_BOOKS_URL, {
        headers: {
          Authorization: `Bearer ${authContext.authData.token}`,
        },
        params: {
          username: authContext.authData.username,
          password: authContext.authData.password,
        },
      });

      localStorage.setItem("AllBooks", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      throw error;
    }
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchAllBooks;
