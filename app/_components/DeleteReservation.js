'use client'

import {TrashIcon} from '@heroicons/react/24/solid'
import * as React from 'react'
import SpinnerMini from './SpinnerMini'

function DeleteReservation({bookingId, onDelete}) {
  const [isPending, startTransition] = React.useTransition()
  // This hook lets you update the state without blocking the UI

  function handleDelete() {
    window.alert('Are you sure you want to delete this reservation ?')
    startTransition(() => onDelete(bookingId))
  }

  return (
    <button
      onClick={handleDelete}
      className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900 disabled:cursor-not-allowed disabled:bg-gray-600'
      disabled={isPending}
    >
      {!isPending && (
        <TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
      )}
      <span className='mt-1 mx-auto'>
        {isPending ? <SpinnerMini /> : 'Delete'}
      </span>
    </button>
  )
}

export default DeleteReservation
