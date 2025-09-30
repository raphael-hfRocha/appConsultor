export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  user: User;
  token: string;
}