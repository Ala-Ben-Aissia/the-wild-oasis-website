import Link from 'next/link'
import {auth} from '../_lib/auth'

export default async function Navigation() {
  const session = await auth() // auth implicitly uses cookies and headers which will cause switching the route from static to dynamic
  // Since Navigation (dynamic) is use used everywhere (in the RootLayout), all SCs will also switch to dynamic which is not ideal (increases the load on the server)

  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='hover:text-accent-400 transition-colors'
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors flex items-center gap-4'
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className='h-10 rounded-full'
                referrerPolicy='no-referrer' // necessary in some situations to correctly display images coming from Google
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'
            >
              <span>Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
