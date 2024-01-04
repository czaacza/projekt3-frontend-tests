interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  details?: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}

interface UserOutput {
  username: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

export type { User, UserOutput, UserLogin };
