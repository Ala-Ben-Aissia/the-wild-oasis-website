import '@/app/_styles/globals.css'
import {Josefin_Sans} from 'next/font/google'
import Header from './_components/Header'

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
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div
          className='flex-1 px-8 py-12 bg-primary-800' /* vertically occupy the rest of the layout */
        >
          <main className='bg-primary-600 max-w-7xl mx-auto'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
