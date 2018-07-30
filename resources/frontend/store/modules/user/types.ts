export interface User {
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  password: string;
  email: string;
}

export interface UserState {
  data: object[] | null;
}
