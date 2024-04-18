import { useState, createContext, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import dotenv from "dotenv";
import { AuthenticationProvider } from "../context/AuthenticationContext";

import "../styles/global.css";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthenticationProvider>
          <Component {...pageProps} />
        </AuthenticationProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
