import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/",
    },
    providers: [],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnBaordPage = nextUrl.pathname.startsWith("/board");
            if (isOnBaordPage) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return NextResponse.redirect(new URL("/board/page/1", nextUrl));
            }
            return true;
        },
    },
} satisfies NextAuthConfig;
