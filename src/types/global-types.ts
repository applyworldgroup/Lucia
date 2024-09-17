import { CookieAttributes, Session, User } from "lucia";

export interface SessionCookie {
    name: string;
    value: string;
    attributes: CookieAttributes;
}

export interface AuthenticatingUserResponse {
    success?: boolean;
    error?: string;
    data?: {
        existingUser?: User;
        user?: User;
    };
    key?: string,
}

export interface SessionProviderProps {
    user: User | null,
    session: Session | null,
}