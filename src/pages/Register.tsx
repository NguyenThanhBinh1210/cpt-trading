import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showCountryModal, setShowCountryModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({ name: 'America', code: '+1' })
  const [countries, setCountries] = useState<{ name: string; code: string }[]>([
    { name: 'America', code: '+1' },
    { name: 'HongKong', code: '+852' },
    { name: 'TaiWan', code: '+886' },
    { name: 'Japan', code: '+81' },
    { name: 'Korea', code: '+82' },
    { name: 'Singapore', code: '+65' },
    { name: 'Malaysia', code: '+60' },
    { name: 'Thailand', code: '+66' },
    { name: 'VietNam', code: '+84' }
  ])
  const [countriesLoading, setCountriesLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadCountries = async () => {
      setCountriesLoading(true)
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd', {
          signal: controller.signal
        })
        if (!response.ok) {
          throw new Error('Failed to load countries')
        }
        const data = (await response.json()) as Array<{
          name?: { common?: string }
          idd?: { root?: string; suffixes?: string[] }
        }>
        const items = data
          .map((item) => {
            const name = item.name?.common?.trim()
            const root = item.idd?.root ?? ''
            const suffix = item.idd?.suffixes?.[0] ?? ''
            const code = `${root}${suffix}`.trim()
            if (!name || !code) {
              return null
            }
            return { name, code }
          })
          .filter((item): item is { name: string; code: string } => Boolean(item))
          .sort((a, b) => a.name.localeCompare(b.name))
        if (items.length > 0) {
          setCountries(items)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setCountries((current) => current)
        }
      } finally {
        if (!controller.signal.aborted) {
          setCountriesLoading(false)
        }
      }
    }

    loadCountries()

    return () => controller.abort()
  }, [])

  return (
    <div className='px-4 pb-10 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-4 mt-3 mb-4'>
        <button
          type='button'
          onClick={() => navigate(-1)}
          className='absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white/80'
          aria-label='Back'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M15 6l-6 6 6 6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </button>
      </div>

      <h1 className='text-2xl font-semibold'>Email registration</h1>

      <div className='mt-6 space-y-5'>
        <div>
          <div className='mb-2 text-sm text-white/80'>Mail</div>
          <input
            type='email'
            placeholder='Please input your email'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Password</div>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Please enter password'
              className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-12 text-sm text-white/90 placeholder:text-white/40'
            />
            <button
              type='button'
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
                <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Confirm Password</div>
          <div className='relative'>
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder='Please confirm your password'
              className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-12 text-sm text-white/90 placeholder:text-white/40'
            />
            <button
              type='button'
              onClick={() => setShowConfirm((prev) => !prev)}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-white/40'
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                <path d='M3 12s4-6 9-6 9 6 9 6-4 6-9 6-9-6-9-6Z' stroke='currentColor' strokeWidth='1.6' />
                <circle cx='12' cy='12' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Verification code</div>
          <div className='relative'>
            <input
              type='text'
              placeholder='Please enter verification code'
              className='h-12 w-full rounded-full bg-[#3b3b35] px-5 pr-24 text-sm text-white/90 placeholder:text-white/40'
            />
            <button
              type='button'
              className='absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-[#a6f36a] px-3 py-1.5 text-sm font-semibold text-[#0f172a]'
            >
              Send
            </button>
          </div>
        </div>

        <div>
          <div className='mb-2 flex items-center gap-3'>
            <div className='text-sm text-white/80'>Phone number</div>
            <button
              type='button'
              onClick={() => setShowCountryModal(true)}
              className='rounded-md bg-[#a6f36a] px-3 py-1.5 text-sm font-semibold text-[#0f172a]'
            >
              {selectedCountry.name}
            </button>
          </div>
          <div className='flex items-center gap-3'>
            <input
              type='text'
              placeholder='Phone number'
              className='h-12 flex-1 rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
            />
          </div>
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Invitation code</div>
          <input
            type='text'
            placeholder='Please enter the invitation code'
            className='h-12 w-full rounded-full bg-[#3b3b35] px-5 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>

        <label className='flex items-center gap-3 text-sm text-white/70'>
          <input type='checkbox' className='h-4 w-4 rounded border-white/30 bg-transparent' />
          <span>
            I agree <span className='text-[#a6f36a]'>{'<<User Agreement and Privacy Agreement>>'}</span>
          </span>
        </label>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-full bg-[#a6f36a] px-6 py-3 text-base font-semibold text-[#0f172a]'
      >
        Register
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-end justify-center transition ${showCountryModal ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${showCountryModal ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setShowCountryModal(false)}
        />
        <div
          className={`w-full max-w-screen-sm rounded-t-3xl bg-[#1f1f1f] text-white transition-transform ${showCountryModal ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <div className='flex items-center justify-between px-5 py-4 text-sm text-white/70'>
            <button type='button' onClick={() => setShowCountryModal(false)}>
              Cancel
            </button>
            <button type='button' onClick={() => setShowCountryModal(false)} className='text-[#a6f36a]'>
              Confirm
            </button>
          </div>
          <div className='max-h-[45vh] overflow-y-auto border-t border-white/10'>
            {countriesLoading ? (
              <div className='px-5 py-6 text-center text-sm text-white/50'>Loading...</div>
            ) : (
              countries.map((country) => {
                const isActive = country.name === selectedCountry.name
                return (
                  <button
                    key={`${country.name}-${country.code}`}
                    type='button'
                    onClick={() => {
                      setSelectedCountry(country)
                      setShowCountryModal(false)
                    }}
                    className={`w-full px-5 py-2 text-center text-base ${isActive ? 'text-white' : 'text-white/70'}`}
                  >
                    {country.name}({country.code})
                  </button>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
