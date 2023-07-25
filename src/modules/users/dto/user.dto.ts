export type CreateUserDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserCreatedDTO = {
  id: string;
  created_at: Date;
  updated_at: Date;
} & CreateUserDTO;

export type UsernameAndEmail = {
  username: string;
  email: string;
};

export type UserToPrisma = {
  id: string;
} & CreateUserDTO;
