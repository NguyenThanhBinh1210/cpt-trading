import { useNavigate } from 'react-router-dom'

const WorkOrderRecord = () => {
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
        <h1 className='text-base font-semibold'>Record</h1>
      </div>

      <div className='mt-16 text-center text-white/60'>No more</div>
    </div>
  )
}

export default WorkOrderRecord
