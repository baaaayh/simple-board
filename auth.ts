import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import pool from "@/app/lib/db";
import { AdapterUser } from "next-auth/adapters";

async function getUser(userId: string): Promise<User | undefined> {
    try {
        const user = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [userId]
        );
        return user.rows[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials, request) {
                if (!credentials?.userId || !credentials?.password) {
                    throw new Error("아이디와 비밀번호를 입력해주세요.");
                }

                const parsedCredentials = z
                    .object({
                        userId: z.string(),
                        password: z.string().min(4),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { userId, password } = parsedCredentials.data;
                    const user = await getUser(userId);
                    if (!user) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.user) {
                const userInfo = {
                    name: (token.user as User).username,
                };
                session.user = userInfo as AdapterUser &
                    User & { emailVerified: null };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
});
