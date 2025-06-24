// models/user.model.ts
export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  password?: string;
  age?: number;
  mobileNumber?: string;
  country?: string;
  gender?: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  mobileNumber?: string;
  country?: string;
  gender?: Gender;
}

export interface JwtResponse {
  token: string;
  id: number;
  username: string;
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface UserResponse {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  mobileNumber?: string;
  country?: string;
  gender?: Gender;
  createdAt: Date;
  updatedAt: Date;
}