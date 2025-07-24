import { UserDetail } from "./userDetails.model";
export interface User {
  id?: number;
  username: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  mobileNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
  role: Role;
}

export interface SignupRequest {
  username: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  mobileNumber?: string;
}
 
export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: Role[];
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
  role: Role;
  mobileNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserAdminView {
  user: UserResponse;
  userDetail: UserDetail | null;
}