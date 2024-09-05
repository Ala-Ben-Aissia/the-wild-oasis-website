export {auth as middleware} from '@/app/_lib/auth'

export const config = {
  matcher: '/account', // protected route
  // avoids running the middleware on path '/account'
}
