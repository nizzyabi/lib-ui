import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"
import { compare } from "bcrypt"
import { User as PrismaUser } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: PrismaUser & { id: string }
  }

  interface User {
    id: string
    password: string | null
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error("Invalid credentials")
        }

        const isValid = await compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error("Invalid credentials")
        }

        // Map the user ID to string to conform with NextAuth expectations
        return {
          ...user,
          id: user.id.toString(), // Ensure ID is a string
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (!profile?.email) {
          console.warn(`${account.provider} sign-in attempted without an email.`)
          return false
        }

        try {
          const existingUser = await db.user.findUnique({
            where: { email: profile.email }
          })

          if (existingUser) {
            if (existingUser.password) {
              console.warn(`Sign-in with ${account.provider} attempted for existing email: ${profile.email} which has a credentials-based account.`)
              return false
            } else {
              user.id = existingUser.id.toString()
              user.password = null
              return true
            }
          } else {
            const newUser = await db.user.create({
              data: {
                name: profile.name || profile.email,
                email: profile.email,
                password: null
              }
            })
            user.id = newUser.id.toString()
            user.password = null
            console.info(`New ${account.provider} user created: ${profile.email}`)
            return true
          }
        } catch (error) {
          console.error(`Error during ${account.provider} sign-in:`, error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as PrismaUser & { id: string }
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  }
}