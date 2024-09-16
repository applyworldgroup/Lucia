interface SessionCookie {
    name: string;
    value: string;
    attributes: CookieAttributes;
  }
  
interface AuthenticatingUserResponse {
    success?: boolean;
    data?: {
      existingUser?: User;
      user?: User;
    };
    key?:string,
    error?: string;
  }