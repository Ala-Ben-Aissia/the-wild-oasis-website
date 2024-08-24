import Spinner from '../_components/Spinner'

export default function Loading() {
  return (
    <div className='grid justify-center items-center'>
      <Spinner />
      <p>Loading cabin data...</p>
    </div>
  )
}
