import { useRouter, NextRouter } from "next/router";

export const redirectToLogIn = (router: NextRouter) => {
  return () => router.push("/login");
};

export const redirectToRegister = (router: NextRouter) => {
  return () => router.push("/register");
};
