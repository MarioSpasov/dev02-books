import { BookTypes } from "./BooksTypes";

export const AuthenticationContextInitial = {
  username: "",
  password: "",
  token: "",
  books: [],
};

export interface AuthenticationContextTypes {
  username: string;
  password: string;
  token: string;
  books: BookTypes[];
}
