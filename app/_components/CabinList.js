import {unstable_noStore as noStore} from 'next/cache'
import {getCabins} from '../_lib/data-service'
import CabinCard from './CabinCard'

export default async function CabinList() {
  // noStore() // cabins data won't be cached
  // This will make the entire /cabins page renders dynamically
  // in case of PPR (in /cabins Page) the entire Page will be static (static shell) and only this CabinList component will be the dynamic hole (wrapped within the React suspense boundaries)

  const cabins = await getCabins()

  if (!cabins.length) return null

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {cabins.length > 0 &&
        cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))}
    </div>
  )
}
