import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

import styles from "../styles/components/Register.module.scss";
import {
  LogInInitial,
  LogInProps,
} from "../InterfacesTypesEnums/RegisterTypes";

import useUserLogIn from "../hooks/apiHooks/useUserLogIn";
import { AuthenticationContext } from "../context/AuthenticationContext";

function LogInForm() {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInProps>({ defaultValues: LogInInitial });

  const router = useRouter();
  const { logInUser } = useUserLogIn();
  const authContext = useContext(AuthenticationContext);

  const [errorFromRequest, setErrorFromRequest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const onSubmit = async (dataForm: LogInProps) => {
    authContext.authData.username = dataForm.username;
    authContext.authData.password = dataForm.password;

    try {
      setLoading(true);
      const loggedIn = await logInUser({
        username: dataForm.username,
        password: dataForm.password,
      });

      if (loggedIn) {
        authContext.authData.token = loggedIn.token;
        localStorage.setItem("authData", JSON.stringify(authContext.authData));
        router.push("/welcome");
      } else {
        setErrorFromRequest("Invalid username or password");
        setLoading(false);
      }
    } catch (error: any) {
      setErrorFromRequest(error.response?.data?.error || "Login failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      authContext.authData.token &&
      authContext.authData.username &&
      authContext.authData.password
    ) {
      router.push("/welcome");
    }
  }, [authContext.authData]);

  return (
    <>
      {errorFromRequest && (
        <div className={styles.error}>
          <p>{errorFromRequest}</p>
          <Button onClick={() => setErrorFromRequest("")} size="small">
            Retry
          </Button>
        </div>
      )}

      {loading && <div className={styles.loader}></div>}

      {!authContext.authData.token && !loading && (
        <>
          <h3 className={styles.heading}>Log In</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formWrapper}
          >
            <label>Username</label>
            <input
              type="text"
              {...formRegister("username", { required: true })}
            />
            {errors.username && (
              <span>
                {errors.username.message
                  ? errors.username.message
                  : "This field is required"}
              </span>
            )}

            <label>Password</label>
            <input
              type="password"
              {...formRegister("password", { required: true })}
            />
            {errors.password && (
              <span>
                {errors.password.message
                  ? errors.password.message
                  : "This field is required"}
              </span>
            )}

            <input className={styles.submitButton} type="submit" />
          </form>
        </>
      )}
    </>
  );
}

export default LogInForm;
