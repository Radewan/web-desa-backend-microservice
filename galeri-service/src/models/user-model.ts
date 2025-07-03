import { User } from "@prisma/client";

export interface UserResponse {
  token?: string;
  user: UserPayload;
}

export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserUpdateRequest {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export const toUserPayload = (user: User): UserPayload => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

export const toUserResponse = (user: User, token: string): UserResponse => {
  return {
    token: token,
    user: toUserPayload(user),
  };
};
