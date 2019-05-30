export interface User {
  email: string;
  password: string;
}

export interface NewUser {
  name: string;
  password: string;
  email: string;
}

export interface UserState {
  userDetails: UserDetails;
}

export interface UserDetails {
  name: string;
  description: string;
  avatar?: File | any;
  background?: File | any;
  socials?: Socials;
}

export interface Socials {
  vk?: string;
  fb?: string;
  email: string;
  tw?: string;
}
