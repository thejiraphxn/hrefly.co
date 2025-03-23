import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username_or_email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(`${process.env.API_URL}/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username_or_email: credentials?.username_or_email,
              password: credentials?.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const { accessToken, user } = await response.json();

          if (!user) {
            throw new Error("User not found");
          }

          return {
            id: user.user_id.toString(), // ✅ ต้องใช้ `id` ตรงกับ NextAuth
            username: user.user_username,
            firstname: user.user_firstname,
            lastname: user.user_lastname,
            accessToken, // ✅ ใช้ `accessToken` ตรงกับ NextAuth
          };
        } catch (error: any) {
          console.error("Login Error:", error.message);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id; // ✅ ใช้ `id` ตาม NextAuth
        token.username = user.username;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },
    async session({ session, token }:any) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id, // ✅ ใช้ `id` ตาม NextAuth
        username: token.username,
        firstname: token.firstname,
        lastname: token.lastname,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
