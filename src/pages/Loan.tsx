import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Loan = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [gender, setGender] = useState('Male')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [certificate, setCertificate] = useState('ID')
  const [handheldFile, setHandheldFile] = useState<File | null>(null)

  const [showGenderSheet, setShowGenderSheet] = useState(false)
  const [showDateSheet, setShowDateSheet] = useState(false)
  const [showCertificateSheet, setShowCertificateSheet] = useState(false)

  const [year, setYear] = useState(1990)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [selectedDob, setSelectedDob] = useState('')
  const [tempYear, setTempYear] = useState(1990)
  const [tempMonth, setTempMonth] = useState(1)
  const [tempDay, setTempDay] = useState(1)

  const handheldPreview = useMemo(() => (handheldFile ? URL.createObjectURL(handheldFile) : ''), [handheldFile])

  const years = Array.from({ length: 80 }, (_, index) => 1950 + index)
  const months = Array.from({ length: 12 }, (_, index) => index + 1)
  const days = Array.from({ length: 31 }, (_, index) => index + 1)

  const dobLabel = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  const tempDobLabel = `${tempYear}-${String(tempMonth).padStart(2, '0')}-${String(tempDay).padStart(2, '0')}`

  return (
    <div className='px-4 pb-10 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-4'>
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
        <h1 className='text-base font-semibold'>Start verification</h1>
      </div>

      <div className='mt-4 space-y-4'>
        <div>
          <div className='text-sm text-white/80'>Name</div>
          <input
            type='text'
            placeholder='Please enter a name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>

        <div>
          <div className='text-sm text-white/80'>Surname</div>
          <input
            type='text'
            placeholder='Please enter last name'
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>

        <div>
          <div className='text-sm text-white/80'>Gender</div>
          <button
            type='button'
            onClick={() => setShowGenderSheet(true)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-left text-sm text-white/80'
          >
            {gender}
          </button>
        </div>

        <div>
          <div className='text-sm text-white/80'>Date of Birth:</div>
          <button
            type='button'
            onClick={() => {
              setTempYear(year)
              setTempMonth(month)
              setTempDay(day)
              setShowDateSheet(true)
            }}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-left text-sm text-white/80'
          >
            {selectedDob || 'Please select a date'}
          </button>
        </div>

        <div>
          <div className='text-sm text-white/80'>Country</div>
          <input
            type='text'
            placeholder='Please enter the country'
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>

        <div>
          <div className='text-sm text-white/80'>Phone number</div>
          <input
            type='text'
            placeholder='Please enter your phone number'
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>

        <div>
          <div className='text-sm text-white/80'>Certificates</div>
          <button
            type='button'
            onClick={() => setShowCertificateSheet(true)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-left text-sm text-white/80'
          >
            {certificate}
          </button>
        </div>
      </div>

      <div className='mt-6 flex flex-col items-center gap-3'>
        <label className='flex w-44 flex-col items-center gap-3'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) setHandheldFile(file)
            }}
          />
          <div className='flex h-24 w-24 items-center justify-center rounded-xl bg-[#3a3a3a]'>
            {handheldPreview ? (
              <img src={handheldPreview} alt='Handheld ID' className='h-full w-full rounded-xl object-cover' />
            ) : (
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/70'>
                <path d='M4 7h4l2-2h4l2 2h4v12H4V7Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                <circle cx='12' cy='13' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            )}
          </div>
          <span className='text-xs text-white/60'>Handheld ID photo</span>
        </label>
      </div>

      <button
        type='button'
        className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white'
      >
        Sure
      </button>

      {showGenderSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowGenderSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowGenderSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowGenderSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {['Male', 'Female'].map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => setGender(option)}
                  className='block w-full text-white/80'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {showDateSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowDateSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowDateSheet(false)}>
                Cancel
              </button>
              <div className='text-white/80'>Please select a date</div>
              <button
                type='button'
                onClick={() => {
                  setYear(tempYear)
                  setMonth(tempMonth)
                  setDay(tempDay)
                  setSelectedDob(tempDobLabel)
                  setShowDateSheet(false)
                }}
                className='text-[#b7f14a]'
              >
                Confirm
              </button>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-4 text-center text-base text-white/80'>
              <div className='max-h-48 overflow-y-auto snap-y snap-mandatory'>
                {years.map((value) => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setTempYear(value)}
                    className={`block w-full snap-center py-2 ${tempYear === value ? 'text-white' : 'text-white/50'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className='max-h-48 overflow-y-auto snap-y snap-mandatory'>
                {months.map((value) => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setTempMonth(value)}
                    className={`block w-full snap-center py-2 ${tempMonth === value ? 'text-white' : 'text-white/50'}`}
                  >
                    {String(value).padStart(2, '0')}
                  </button>
                ))}
              </div>
              <div className='max-h-48 overflow-y-auto snap-y snap-mandatory'>
                {days.map((value) => (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setTempDay(value)}
                    className={`block w-full snap-center py-2 ${tempDay === value ? 'text-white' : 'text-white/50'}`}
                  >
                    {String(value).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            <div className='mt-4 text-center text-xs text-white/60'>{tempDobLabel}</div>
          </div>
        </>
      )}

      {showCertificateSheet && (
        <>
          <div className='fixed inset-0 z-40 bg-black/60' onClick={() => setShowCertificateSheet(false)} />
          <div className='fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#2f2f2f] px-4 pb-6 pt-4 text-white'>
            <div className='flex items-center justify-between text-sm text-white/60'>
              <button type='button' onClick={() => setShowCertificateSheet(false)}>
                Cancel
              </button>
              <button type='button' onClick={() => setShowCertificateSheet(false)} className='text-[#b7f14a]'>
                Confirm
              </button>
            </div>
            <div className='mt-6 space-y-4 text-center text-base'>
              {['ID', 'Passport'].map((option) => (
                <button
                  key={option}
                  type='button'
                  onClick={() => setCertificate(option)}
                  className='block w-full text-white/80'
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Loan
