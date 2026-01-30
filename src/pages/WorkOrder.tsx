import { Link, useNavigate } from 'react-router-dom'

const WorkOrder = () => {
  const navigate = useNavigate()

  return (
    <div className='px-3 pt-4 text-white'>
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
        <h1 className='text-base font-semibold'>Submit a work order</h1>
        <Link
          to='/work-order-record'
          className='absolute right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white/80'
          aria-label='Record'
        >
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path
              d='M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'
              stroke='currentColor'
              strokeWidth='1.6'
            />
            <path d='M9 9h6M9 13h6M9 17h4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </Link>
      </div>

      <div className='space-y-5'>
        <div>
          <div className='mb-2 text-sm text-white/80'>Title</div>
          <input
            type='text'
            placeholder='Please enter a title'
            className='h-12 w-full rounded-2xl bg-[#3b3b35] px-4 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>

        <div>
          <div className='mb-2 text-sm text-white/80'>Feedback content</div>
          <textarea
            placeholder='Feedback content should be no less than 10 words'
            className='h-40 w-full resize-none rounded-2xl bg-[#3b3b35] px-4 py-3 text-sm text-white/90 placeholder:text-white/40'
          />
        </div>
      </div>

      <button
        type='button'
        className='mt-8 w-full rounded-full bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-[#0f172a]'
      >
        Sure
      </button>
    </div>
  )
}

export default WorkOrder
