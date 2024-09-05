import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import {createGuest, getGuest} from './data-service'

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async authorized({auth}) {
      return !!auth?.user
    },
    async signIn({user}) {
      // runs before the signin process completes (after the user submits his credentials and before actually being signed in, like a middleware)
      try {
        const existentGuest = await getGuest(user.email)
        if (!existentGuest) {
          await createGuest({fullName: user.name, email: user.email})
        }
        return true
      } catch (e) {
        console.log({SignInError: e})
        return false
      }
    },
    async session({session}) {
      // runs after the sign in callback
      // session === await auth()
      const guest = await getGuest(session.user.email) // db
      session.user.guestId = guest.id // add guestId to the session user
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
})
