import logo from '@/public/logo.png'
import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href='/' className='flex items-center gap-4 z-10'>
      <Image
        src={logo}
        height='55'
        width='55'
        alt='The Wild Oasis logo'
        quality={100}
        priority
      />
      {/* <Image
        src='/logo.png'
        height='60'
        width='60'
        alt='The Wild Oasis logo'
        priority
      /> */}
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </Link>
  )
}

export default Logo
