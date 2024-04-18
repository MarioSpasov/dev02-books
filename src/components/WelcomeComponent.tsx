import { useContext, useEffect } from "react";

import { useRouter } from "next/router";

import styles from "../styles/components/Register.module.scss";

import { AuthenticationContext } from "../context/AuthenticationContext";
import useFetchAllBooks from "../hooks/apiHooks/useFetchAllBooks";
import { AxiosError } from "axios";

function WelcomeComponent() {
  const authContext = useContext(AuthenticationContext);
  const router = useRouter();

  useEffect(() => {}, [authContext]);

  const { isLoading, error, data } = useFetchAllBooks();

  if (data) {
    authContext.books = [...data];
    router.push("/books/allbooks");
  }

  if (error) {
    const axiosError = error as AxiosError;
    return <h3>{axiosError.message}</h3>;
  }

  return (
    <>
      <h3>Welcome {authContext.authData.username}</h3>
      <p>We are fetching your data, please wait!</p>
      <div className={styles.spinnerWrapper}>
        <span className={styles.loader}></span>
      </div>
    </>
  );
}

export default WelcomeComponent;
