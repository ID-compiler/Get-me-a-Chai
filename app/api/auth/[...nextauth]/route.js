import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        await connectDb();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            name: user.name || user.email.split("@")[0],
          });
        }
        return true;
      }
      return false;
    },
    async session({ session }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        console.log(dbUser)
        session.user.name = dbUser.username; // using latest username from DB
        console.log(session.user.name)
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
