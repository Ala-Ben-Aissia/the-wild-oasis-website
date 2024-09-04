import {NextResponse} from 'next/server'

export function middleware(request) {
  return NextResponse.redirect(new URL('/about', request.url))
}

export const config = {
  // *: zero or more => /cabins | /cabins/23 | cabins/23/ParamKey/ParamVlaue ...
  // +: one or more => /cabins/23 | cabins/23/ParamKey2/ParamValue2 ...
  // ?: zero or one => /cabins | /cabins/23
  matcher: ['/account', '/cabins/:id?'],
  // routes where this middleware should run
}
