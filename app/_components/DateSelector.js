'use client'

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns'
import React from 'react'
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import {useRange} from '../contexts/ReservationContext'

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
  const {range, setRange, resetRange} = useRange()

  const {regularPrice, discount} = cabin

  const {minBookingNights, maxBookingNights} = settings

  const displayRange = React.useMemo(
    () =>
      isAlreadyBooked(range, bookedDates)
        ? {from: undefined, to: undefined}
        : range,
    [range, bookedDates],
  )

  const numNights = differenceInDays(range.to, range.from)
  // X nights => X+1 days => pay X nights

  const cabinPrice = numNights * (regularPrice - discount)

  React.useEffect(() => {
    setRange(displayRange)
  }, [displayRange, setRange])

  return (
    <div className='flex flex-col justify-between'>
      <DayPicker
        className='rdp pt-6 place-self-center scale-90'
        mode='range'
        onSelect={setRange}
        selected={displayRange}
        min={minBookingNights + 1}
        max={maxBookingNights}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)}
        // disabled={{
        //   before: new Date().setDate(new Date().getDate() + 1),
        // }}
        disabled={(cellDate) => {
          return (
            isPast(cellDate) ||
            bookedDates.some((date) => isSameDay(cellDate, date))
          )
        }}
        captionLayout='dropdown'
        numberOfMonths={2}
        classNames={{
          // chevron: 'fill-primary-400',
          // today: 'text-accent-300 line-through',
          // selected: `${
          //   getDefaultClassNames().selected
          // } border-red-400`,
          range_start: 'bg-accent-500 rounded-l-full',
          // range_middle: `${
          //   getDefaultClassNames().range_middle
          // } border border-accent-500`,
          range_end: 'bg-accent-500 rounded-r-full',
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
          {numNights && displayRange.from && displayRange.to ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>
                  Total
                </span>{' '}
                <span className='text-2xl font-semibold'>
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className='border border-primary-800 py-2 px-4 text-sm font-semibold'
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default DateSelector
