'use server'

import {revalidatePath} from 'next/cache'
import {auth, signIn, signOut} from './auth'
import {deleteBooking, getBooking, updateGuest} from './data-service'

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

export async function deleteReservation(bookingId) {
  const booking = await getBooking(bookingId)
  const session = await auth()

  if (!session) throw new Error('You must sign in first!')
  if (booking.guestId !== session.user.guestId) {
    throw new Error('You are not allowed to delete this reservation!')
  }
  /* 
    this check is so important, if not implemented, any user can delete other user's bookings and here are the steps to achieve that:
    1. deletes to his own booking
    2. in the network tab, he copies the POST request as cURL
    3. change the booking id ( --data-raw '[410]') to any value
  */

  await deleteBooking(bookingId)
  // await new Promise((res) => setTimeout(res, 2000))

  revalidatePath('/account/reservations')
}
