'use client'

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import * as React from 'react'

const OPTIONS = [
  {value: 'all', content: 'All'},
  {value: 'large', content: 'Large'},
  {value: 'medium', content: 'Medium'},
  {value: 'small', content: 'Small'},
]

export default function Filter() {
  const [capacity, setCapacity] = React.useState('all')
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  // React.useEffect(() => {
  //   console.log(`go to ${capacity}`)
  //   router.push(`?capacity=${capacity}`)
  // }, [capacity, router])

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('capacity', filter)
    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
      //  scroll to the top of the page when navigating to a new route
    })
    setCapacity(filter)
  }

  return (
    <div className='border-primary-800 flex justify-end items-center mt-10 mb-6'>
      <p className='text-lg mr-5'>Filter By Capacity</p>
      <select
        value={capacity}
        onChange={(event) => handleFilter(event.target.value)}
        className='border border-primary-900 text-primary-50 py-1 bg-primary-700 rounded-md outline-none text-center'
      >
        {OPTIONS.map(({value, content}, index) => (
          <option key={index} value={value}>
            {content}
          </option>
        ))}
      </select>
    </div>
  )
}
