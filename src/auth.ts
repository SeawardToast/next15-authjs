import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import client from "./lib/db"
import { authOptions } from "./app/config/next-auth";
import { adapter } from "next/dist/server/web/adapter";

// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('credentials', credentials)
        
        let user = null
 
        // logic to verify if the user exists
        user = {email: 'myUser'}
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})