import {auth} from '../_lib/auth'
import {
  getBookedDatesByCabinId,
  getSettings,
} from '../_lib/data-service'
import DateSelector from './DateSelector'
import LoginMessage from './LoginMessage'
import ReservationForm from './ReservationForm'

export default async function Reservation({cabin}) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]) // this will resolve when the longest request finishes
  const session = await auth()

  return (
    <div className='grid grid-cols-2 min-w-max -translate-x-32 border border-primary-800 min-h-[400px]'>
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}
