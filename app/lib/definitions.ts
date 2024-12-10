import { Session } from "next-auth";

export interface User {
    id: string;
    username: string;
    password: string;
}

export interface SessionProps {
    userInfo: Session | null;
}
