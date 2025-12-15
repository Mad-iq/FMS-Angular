export interface RegisterRequest {
  username: string;
  password: string;
  role?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}


export interface AuthResponse {
  token?: string;
  id?: number;
  role?: string;
  error?: string;
}


export interface User {
  id: number;
  username: string;
  role: string;
}
