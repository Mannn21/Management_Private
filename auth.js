import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.BETTER_AUTH_SECRET,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const {email, password} = credentials;

                if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                    return { id: "1", name: "Admin", email}
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    }
})