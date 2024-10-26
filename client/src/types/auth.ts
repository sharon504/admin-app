export interface User {
  id: string;
  username: string;
  email: string;
  currentRole: string;
  // Add any other user properties you need
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
}
