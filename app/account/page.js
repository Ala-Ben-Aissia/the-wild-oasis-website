import {auth} from '../_lib/auth'

export const metadata = {
  title: 'Account',
}

export default async function Page() {
  const {user} = await auth()
  // this is a protected route so user will  always be there
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-7'>
        Welcome, {user.name.split(' ').at(0)}
      </h2>
    </div>
  )
}
