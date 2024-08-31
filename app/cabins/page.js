import {Suspense} from 'react'
import CabinList from '../_components/CabinList'
import Filter from '../_components/Filter'
import Spinner from '../_components/Spinner'

export const metadata = {
  title: 'Cabins',
}

// export const revalidate = 0 // make this /cabins route dynamic
export const revalidate = 3600 // ISR (refetch cabins every 1 hour)

export default function Page({searchParams}) {
  // This component is no longer static since it now depends on the searchParams which is unknown in build-time, but ISR can still be benificial for static parts (immediately rendering the static shell part)

  // whenever navigating to a new url with new searchParams, this server component will re-render

  const filter = searchParams?.capacity ?? 'all'

  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the
        Italian Dolomites. Imagine waking up to beautiful mountain
        views, spending your days exploring the dark forests around,
        or just relaxing in your private hot tub under the stars.
        Enjoy nature&rsquo;s beauty in your own little home away from
        home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <Filter />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  )
}
