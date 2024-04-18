import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

import styles from "../styles/components/Register.module.scss";
import {
  RegisterDataProps,
  RegisterDataInitial,
} from "../InterfacesTypesEnums/RegisterTypes";

import useRegistration from "../hooks/apiHooks/useUserRegistration";
import validateForm from "../utils/validateForm";
import { AuthenticationContext } from "../context/AuthenticationContext";

function RegisterForm() {
  const {
    register: formRegister,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterDataProps>({ defaultValues: RegisterDataInitial });

  const {
    isLoading,
    error,
    data: registrationData,
    registerUser,
  } = useRegistration();

  const router = useRouter();
  const [errorFromRequest, setErrorFromRequest] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (registrationData) {
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  }, [registrationData, router, errorFromRequest]);

  const onSubmit = async (dataForm: RegisterDataProps) => {
    const validationErrors = validateForm(dataForm);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        setError(error.field, {
          type: "manual",
          message: error.message,
        });
      });
      return;
    }

    try {
      await registerUser({
        username: dataForm.username,
        password: dataForm.password,
      });
    } catch (error: any) {
      setErrorFromRequest(error.response.data.error || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <>
      {errorFromRequest && (
        <div className={styles.error}>
          <p>{errorFromRequest || "Registration failed"}</p>
          <Button onClick={() => router.reload()} size="small">
            Retry
          </Button>
        </div>
      )}

      {registrationData && (
        <div>
          <p>Congratulations, your account was successfully created!</p>
          <Button onClick={() => router.push("/login")} size="small">
            Log in
          </Button>
        </div>
      )}

      {loading && <div className={styles.loader}></div>}

      {!registrationData && !loading && !error && (
        <>
          <h3 className={styles.heading}>Sign Up</h3>
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

            <label>Repeat password</label>
            <input
              type="password"
              {...formRegister("repeat", { required: true })}
            />
            {errors.repeat && (
              <span>
                {errors.repeat.message
                  ? errors.repeat.message
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

export default RegisterForm;
