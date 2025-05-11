// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 🔧 Replace this with your real lookup logic:
        if (
          credentials?.email === "test@example.com" &&
          credentials.password === "password"
        ) {
          return { id: "1", name: "Test User", email: "test@example.com" };
        }
        return null;
      }
    })
  ],
  // A secret for encrypting JWTs, sessions, etc.
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",      // Custom login page (optional)
    error: "/auth/login?error"  // Error code passed in query string
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
