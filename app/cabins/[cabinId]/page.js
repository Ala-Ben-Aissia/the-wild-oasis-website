import Reservation from '@/app/_components/Reservation'
import Spinner from '@/app/_components/Spinner'
import TextExpander from '@/app/_components/TextExpander'
import {
  getCabin,
  getCabinDescription,
  getCabins,
} from '@/app/_lib/data-service'
import {
  EyeSlashIcon,
  MapPinIcon,
  UsersIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import {Suspense} from 'react'

export async function generateMetadata({params: {cabinId}}) {
  const cabin = await getCabin(cabinId)
  return {
    title: 'Cabin ' + cabin.name,
  }
}

// Return a list of `params` to populate the [cabinId] dynamic segment
export async function generateStaticParams() {
  const cabins = await getCabins()
  return cabins.map((cabin) => ({cabinId: String(cabin.id)}))
}

// Multiple versions of this page will be statically generated using the `params` returned by `generateStaticParams`

export default async function Page({params: {cabinId}}) {
  const cabin = await getCabin(cabinId)

  const {name, maxCapacity, image} = cabin
  const {description} = await getCabinDescription(cabinId)

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <div className='grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24'>
        <div className='relative scale-[1.15] -translate-x-3'>
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className='object-cover'
          />
        </div>

        <div>
          <h3 className='text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]'>
            Cabin {name}
          </h3>

          <p className='text-lg text-primary-300 mb-10'>
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className='flex flex-col gap-4 mb-7'>
            <li className='flex gap-3 items-center'>
              <UsersIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                For up to{' '}
                <span className='font-bold'>{maxCapacity}</span>{' '}
                guests
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <MapPinIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Located in the heart of the{' '}
                <span className='font-bold'>Dolomites</span> (Italy)
              </span>
            </li>
            <li className='flex gap-3 items-center'>
              <EyeSlashIcon className='h-5 w-5 text-primary-600' />
              <span className='text-lg'>
                Privacy <span className='font-bold'>100%</span>{' '}
                guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className='text-5xl font-semibold text-center text-accent-400 mb-10'>
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  )
}
