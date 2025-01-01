export const users: {
    id: string;
    email: string;
    password: string;
    fullName: string;
    verified: boolean;
  }[] = [];
  
  export const verificationTokens: Map<string, { email: string; expires: number }> = new Map();
  