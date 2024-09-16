import { Session, User } from "lucia";

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

interface SessionProviderProps {
    user: User | null,
    session: Session | null,
  }