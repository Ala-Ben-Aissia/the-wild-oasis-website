'use client'

import React from 'react'
import {deleteReservation} from '../_lib/actions'
import ReservationCard from './ReservationCard'

export default function ReservationList({bookings}) {
  const [optimisticBookings, optimisticDelete] = React.useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((b) => b.id !== bookingId), // the optimistic result
  )
  async function handleDelete(bookingId) {
    // optimistic operation (≈ dispatch action)
    optimisticDelete(bookingId)
    // actual operation
    await deleteReservation(bookingId)
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  )
}
