export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthData {
  id: string;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
}

export interface TokenData {
  token: string;
  refreshToken: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}
