import SelectCountry from '@/app/_components/SelectCountry'
import UpdateProfileForm from '@/app/_components/UpdateProfileForm'

export const metadata = {
  title: 'Update profile',
}

const countryFlag = 'pt.jpg'
const nationality = 'portugal'

// since we cannot use SC inside a CC, we pass it as a children prop
// it will be imported here (importing SC inside and SC) and drilled down to CC

export default function Page() {
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-4'>
        Update your guest profile
      </h2>

      <p className='text-lg mb-8 text-primary-200'>
        Providing the following information will make your check-in
        process faster and smoother. See you soon!
      </p>

      <UpdateProfileForm
        nationality={nationality}
        countryFlag={countryFlag}
      >
        <SelectCountry
          name='nationality'
          id='nationality'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  )
}
