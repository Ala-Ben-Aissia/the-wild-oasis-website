import Logo from '@/app/_components/Logo'
import Navigation from '@/app/_components/Navigation'
import '@/app/_styles/globals.css'
import {Josefin_Sans} from 'next/font/google'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap', // first display the text in some default font, and once this font is ready it will be applied
})

export const metadata = {
  title: {
    template: '%s – The Wild Oasis',
    default: 'Welcome to The Wild Oasis',
  },
  description:
    "Luxurious Cabin hotel, located in the heart of the forest where you'll explore the beauty of nature in the purest environment",
}

export default function RootLayout({children}) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by the wild oasis</footer>
      </body>
    </html>
  )
}
