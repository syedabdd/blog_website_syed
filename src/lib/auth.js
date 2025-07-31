import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utlis";
import { User } from "./models";
import bcrypt from "bcrypt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDb();
        const user = await User.findOne({ username: credentials.username });

        if (!user) throw new Error("No user found");

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong password");

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectToDb();

        if (account.provider !== "credentials") {
          const existingUser = await User.findOne({ email: profile.email });

          if (!existingUser) {
            const newUser = new User({
              username:
                account.provider === "github"
                  ? profile.login
                  : profile.name?.replace(/\s+/g, "").toLowerCase(),
              email: profile.email,
              img:
                account.provider === "github"
                  ? profile.avatar_url
                  : profile.picture,
              isAdmin: false, // default non-admin
            });
            await newUser.save();
          }
        }

        return true;
      } catch (err) {
        console.error("SIGNIN ERROR", err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
