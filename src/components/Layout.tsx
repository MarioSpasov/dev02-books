import { Button } from "@mui/material";
import { LayoutProps } from "../InterfacesTypesEnums/LayoutTypes";
import { useRouter } from "next/router";
import { redirectToLogIn, redirectToRegister } from "../hooks/useRedirect";
import { AuthenticationContext } from "../context/AuthenticationContext";
import { useContext } from "react";
import useUserLogOutWrapper from "../hooks/apiHooks/useUserLogOut";

import styles from "../styles/components/Layout.module.scss";

function Layout({ authenticated, homepage, children, books }: LayoutProps) {
  const router = useRouter();
  const redirectLogIn = redirectToLogIn(router);
  const redirectRegister = redirectToRegister(router);
  const authContext = useContext(AuthenticationContext);

  const { logOutUser, isLoading, error, data } = useUserLogOutWrapper();

  const handleLogOut = async () => {
    try {
      await logOutUser();
      localStorage.removeItem("authData");
      localStorage.removeItem("Allbooks");
      router.push("/index");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (books) {
    return (
      <div className={styles.layoutWrapper}>
        <div className={styles.layoutNavbar}>
          <p>Welcome {authContext.authData.username}</p>
          <Button onClick={handleLogOut}>Log Out</Button>
        </div>
        <div className={styles.layoutWrapperBooks}>
          <div>{children}</div>
        </div>
      </div>
    );
  }
  if (authenticated) {
    return (
      <div className={styles.layoutWrapper}>
        <div className={styles.layoutNavbar}>
          <p>Welcome {authContext.authData.username}</p>
          <Button onClick={handleLogOut}>Log Out</Button>
        </div>
        <div className={styles.contentWrapper}>
          <div>{children}</div>
        </div>
      </div>
    );
  }

  if (homepage) {
    return (
      <div className={styles.layoutWrapper}>
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    );
  }

  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.layoutNavbar}>
        <Button onClick={redirectLogIn}>Log In</Button>
        <Button onClick={redirectRegister}> Sign up</Button>
      </div>
      <div className={styles.contentWrapper}>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
