export interface AuthData {
  _id?: string;
  name?: string;
  username?: string;
  email: string;
  password: string;
  user_image?: string;
  phone_number?: string;
  job_concern?: boolean;
  postalCode?: string;
  bio?: string;
  storeId?: string;
}


export interface Token {
  token: string;
}

export interface ResendEmail {
  email: string;
}
