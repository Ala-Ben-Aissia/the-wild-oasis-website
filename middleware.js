export {auth as middleware} from '@/app/_lib/auth'

export const config = {
  matcher: '/account', // protected route
  // middleware will run on ecery protected route
}
