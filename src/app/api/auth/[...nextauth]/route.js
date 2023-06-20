import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Invalid input");
        }

        const comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
          throw new Error("Invalid input");
        } else {
          const { password, ...currentUser } = user._doc;

          const accessToken = signJwtToken(currentUser, { expiresIn: "6d" });

          return {
            ...currentUser,
            accessToken
          };
        }
      }
    })
  ]
});
