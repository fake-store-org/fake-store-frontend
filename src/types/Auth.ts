export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: number;
  role: string;
  email: string;
}

export interface RegisterUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshResponse {
  accessToken: string;
}

export interface User {
  userId: number;
  email: string;
  role: string;
}

export interface AddressRequest {
  firstName: string;
  lastName: string;
  co: string;
  streetName: string;
  streetName2: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface AddressResponse {
  firstName: string;
  lastName: string;
  co: string;
  streetName: string;
  streetName2: string;
  postalCode: string;
  city: string;
  country: string;
}
