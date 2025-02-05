'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {auth, signIn, signOut} from './auth'
import {
  createBooking,
  deleteBooking,
  getBooking,
  getGuest,
  updateBooking,
  updateGuest,
} from './data-service'

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

  const guest = await getGuest(session.user.email)
  if (
    nationalID == guest.nationalID &&
    country == guest.nationality
  ) {
    return
  }

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
    => This scenario is a common security concern known as Insecure Direct Object Reference (IDOR)
  */

  await deleteBooking(bookingId)
  // await new Promise((res) => setTimeout(res, 2000))

  revalidatePath('/account/reservations')
  revalidatePath(`/cabins/${booking.cabinId}`)
}

export async function updateBookingAction(formData) {
  const session = await auth()
  const bookingId = formData.get('bookingId')
  const observations = formData.get('observations')
  const numGuests = formData.get('numGuests')
  const booking = await getBooking(bookingId)

  if (!session)
    throw new Error('You must log in to perform this action!')

  if (session.user.guestId !== booking.guestId)
    throw new Error('You are not allowed to update this reservation!')

  if (
    numGuests == booking.numGuests &&
    observations == booking.observations
  )
    return
  await updateBooking(bookingId, {numGuests, observations})

  revalidatePath(`/account/reservations/edit/${bookingId}`)
  redirect('/account/reservations')
}

export async function createReservationAction(bookingData, formData) {
  const session = await auth()
  const observations = formData.get('observations').slice(0, 500)
  const numGuests = formData.get('numGuests')

  if (!session)
    throw new Error('You must log in to perform this action!')

  if (!bookingData.startDate || !bookingData.endDate) return

  await createBooking({
    ...bookingData,
    guestId: session.user.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    status: 'unconfirmed',
    hasBreakfast: false,
    isPaid: false,
  })

  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/thank-you')
}
