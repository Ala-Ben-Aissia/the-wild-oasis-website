import {
  getBookedDatesByCabinId,
  getSettings,
} from '../_lib/data-service'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'

export default async function Reservation({cabin}) {
  // const settings = await getSettings()
  // const bookedDates = await getBookedDatesByCabinId(cabin.id)
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]) // this will resolve when the longest request finishes

  return (
    <div className='grid grid-cols-2 min-w-max -translate-x-32 border border-primary-800 min-h-[400px]'>
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  )
}
