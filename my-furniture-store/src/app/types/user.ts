export interface UserForAuth {
  username: string;
  email: string;
  phone: string;
  password: string;
  _id: string;
}

export interface UserProfile {
  username: string;
  email: string;
  phone: string;
}

export interface EditingProfile {
  [key: string]: boolean;
  username: boolean;
  email: boolean;
  phone: boolean;
}