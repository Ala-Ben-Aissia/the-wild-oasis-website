'use client'

import {isWithinInterval} from 'date-fns'
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {start: range.from, end: range.to}),
    )
  )
}

function DateSelector({cabin, settings, bookedDates}) {
  const {regularPrice, discount, numNights} = cabin
  const range = {
    from: bookedDates[0],
    to: bookedDates.at(-1),
  }

  const {minBookingNights, maxBookingNights} = settings

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='rdp pt-6 place-self-center scale-90'
        mode='range'
        min={minBookingNights + 1}
        max={maxBookingNights}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        disabled={{
          before: new Date().setDate(new Date().getDate() + 1),
          // before: new Date(),
        }}
        captionLayout='dropdown'
        numberOfMonths={2}
        classNames={{
          // chevron: 'fill-primary-400',
          // today: 'text-accent-300 line-through',
          // selected: 'text-accent-500',
          range_start: 'bg-accent-500 rounded-full',
          range_middle: 'bg-transparent text-accent-400',
          range_end: 'bg-accent-400 rounded-full',
        }}
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>
                  ${regularPrice - discount}
                </span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>
                  Total
                </span>{' '}
                <span className='text-2xl font-semibold'>
                  ${regularPrice - discount}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold'
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default DateSelector
