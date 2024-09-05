'use server'

import {revalidatePath} from 'next/cache'
import {auth, signIn, signOut} from './auth'
import {updateGuest} from './data-service'

export async function signInAction() {
  await signIn('google', {redirectTo: '/account'})
}

export async function signOutAction() {
  await signOut({redirectTo: '/'})
}

export async function updateProfile(id, formData) {
  const session = await auth()
  if (!session) throw new Error('You must sign in first!')
  // we can also get the guestId from session.user.id since we've already added added it in the session callback in auth.js

  const nationality = formData.get('nationality')
  const nationalID = formData.get('nationalID')
  const [country, countryFlag] = nationality.split('%')

  const regex = /^[a-zA-Z0-9]{6,12}$/
  if (!regex.test(nationalID))
    throw new Error('Please provide a valid national ID')

  await updateGuest(id, {
    nationality: country,
    countryFlag,
    nationalID,
  })

  revalidatePath('/account/profile')
}
