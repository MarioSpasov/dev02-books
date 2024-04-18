import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  AuthenticationContextInitial,
  AuthenticationContextTypes,
} from "../InterfacesTypesEnums/AuthContextInitial";
import { BookTypes } from "../InterfacesTypesEnums/BooksTypes";

export const AuthenticationContext = createContext<{
  authData: AuthenticationContextTypes;
  setData: React.Dispatch<React.SetStateAction<AuthenticationContextTypes>>;
  books: BookTypes[];
}>({
  authData: AuthenticationContextInitial,
  setData: () => {},
  books: [],
});

interface AuthenticationProviderProps {
  children: ReactNode;
}

export const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({
  children,
}) => {
  const [authData, setData] = useState<AuthenticationContextTypes>(
    AuthenticationContextInitial
  );
  const [books, setBooks] = useState<BookTypes[]>([]);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    const storedBooksData = localStorage.getItem("AllBooks");
    if (storedAuthData && storedBooksData) {
      const authData = JSON.parse(storedAuthData);
      const booksData = JSON.parse(storedBooksData);
      setData(authData);
      setBooks(booksData);
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authData, setData, books }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
