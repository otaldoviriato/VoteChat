import { connectMongoDB } from "../../../../lib/mongodb"
import User from "../../../../models/user"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, senha } = credentials

        try {
          await connectMongoDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const senhaMatch = await bcrypt.compare(senha, user.senha)

          if (!senhaMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log("Error: ", error)
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user
        return {
          ...token,
          id: u.id,
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }