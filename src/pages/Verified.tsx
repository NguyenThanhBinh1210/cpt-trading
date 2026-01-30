import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Verified = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)

  const frontPreview = useMemo(() => (frontFile ? URL.createObjectURL(frontFile) : ''), [frontFile])
  const backPreview = useMemo(() => (backFile ? URL.createObjectURL(backFile) : ''), [backFile])

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
        <h1 className='text-base font-semibold'>Verified</h1>
      </div>

      <div className='mt-4 text-sm text-white/70'>Please complete your personal information</div>

      <div className='mt-5 space-y-4'>
        <div>
          <div className='text-sm text-white/80'>Name</div>
          <input
            type='text'
            placeholder='Please enter your name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>

        <div>
          <div className='text-sm text-white/80'>ID Number</div>
          <input
            type='text'
            placeholder='Please enter ID number'
            value={idNumber}
            onChange={(event) => setIdNumber(event.target.value)}
            className='mt-2 w-full rounded-2xl bg-[#2f2f2f] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none'
          />
        </div>
      </div>

      <div className='mt-6 text-center text-sm text-[#a6f36a]'>Please upload both sides of the ID</div>

      <div className='mt-6 flex flex-col items-center gap-6'>
        <label className='flex w-44 flex-col items-center gap-3'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) setFrontFile(file)
            }}
          />
          <div className='flex h-24 w-24 items-center justify-center rounded-xl bg-[#3a3a3a]'>
            {frontPreview ? (
              <img src={frontPreview} alt='Front ID' className='h-full w-full rounded-xl object-cover' />
            ) : (
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/70'>
                <path d='M4 7h4l2-2h4l2 2h4v12H4V7Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                <circle cx='12' cy='13' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            )}
          </div>
          <span className='text-xs text-white/60'>Upload front of ID</span>
        </label>

        <label className='flex w-44 flex-col items-center gap-3'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) setBackFile(file)
            }}
          />
          <div className='flex h-24 w-24 items-center justify-center rounded-xl bg-[#3a3a3a]'>
            {backPreview ? (
              <img src={backPreview} alt='Back ID' className='h-full w-full rounded-xl object-cover' />
            ) : (
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none' aria-hidden='true' className='text-white/70'>
                <path d='M4 7h4l2-2h4l2 2h4v12H4V7Z' stroke='currentColor' strokeWidth='1.6' strokeLinejoin='round' />
                <circle cx='12' cy='13' r='3' stroke='currentColor' strokeWidth='1.6' />
              </svg>
            )}
          </div>
          <span className='text-xs text-white/60'>Upload back of ID</span>
        </label>
      </div>

      <button
        type='button'
        className='mt-8 w-full rounded-full bg-[#a6f36a] px-6 py-3 text-base font-semibold text-[#1f1f1f]'
      >
        Sure
      </button>
    </div>
  )
}

export default Verified
