declare interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

declare interface User {
  id: number;
  email: string;
  username: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
}

declare interface LoginCredential {
  email: string;
  password: string;
}

declare interface RegisterCredential {
  email: string;
  name: string;
  password: string;
  password2: string;
}
