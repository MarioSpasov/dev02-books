export interface RegisterDataProps {
  username: string;
  password: string;
  repeat: string;
}

export const RegisterDataInitial = {
  username: "",
  password: "",
  repeat: "",
};

export interface LogInProps {
  username: string;
  password: string;
}

export const LogInInitial = {
  username: "",
  password: "",
};

export interface CustomError {
  message: string;
}

export interface RegisterProps {
  username: string;
  password: string;
}

export type FieldName = "username" | "password" | "repeat";
