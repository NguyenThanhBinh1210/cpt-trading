import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const InviteFriends = () => {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const invitationCode = 'OFVH1B'
  const inviteUrl = `https://m.cptesing.com/#/register?invite_code=${invitationCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // QR code component - generates a pattern that looks like a QR code
  const QRCode = () => {
    const size = 200
    const modules = 25
    const moduleSize = size / modules

    // Generate a QR-like pattern with finder patterns (corner squares)
    const generatePattern = () => {
      const pattern = []
      for (let y = 0; y < modules; y++) {
        const row = []
        for (let x = 0; x < modules; x++) {
          let isDark = false

          // Finder patterns (top-left, top-right, bottom-left)
          if (
            (x < 7 && y < 7) ||
            (x >= modules - 7 && y < 7) ||
            (x < 7 && y >= modules - 7)
          ) {
            // Outer square
            if (x < 2 || x >= modules - 2 || y < 2 || y >= modules - 2) {
              isDark = true
            }
            // Inner square
            else if ((x >= 2 && x < 5 && y >= 2 && y < 5) ||
                     (x >= modules - 5 && x < modules - 2 && y >= 2 && y < 5) ||
                     (x >= 2 && x < 5 && y >= modules - 5 && y < modules - 2)) {
              isDark = true
            }
            // Center square
            else if ((x >= 3 && x < 4 && y >= 3 && y < 4) ||
                     (x >= modules - 4 && x < modules - 3 && y >= 3 && y < 4) ||
                     (x >= 3 && x < 4 && y >= modules - 4 && y < modules - 3)) {
              isDark = true
            }
          }
          // Timing patterns (horizontal and vertical lines)
          else if (x === 6 || y === 6) {
            isDark = (x + y) % 2 === 0
          }
          // Data pattern
          else {
            // Random-like pattern based on position
            isDark = (x * 7 + y * 11) % 3 === 0 || (x + y) % 5 === 0
          }

          row.push(isDark)
        }
        pattern.push(row)
      }
      return pattern
    }

    const pattern = generatePattern()

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='mx-auto'>
        <rect width={size} height={size} fill='#fff' />
        {pattern.map((row, y) =>
          row.map((isDark, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * moduleSize}
              y={y * moduleSize}
              width={moduleSize}
              height={moduleSize}
              fill={isDark ? '#000' : '#fff'}
            />
          ))
        )}
      </svg>
    )
  }

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
        <h1 className='text-base font-semibold'>Invite friends</h1>
      </div>

      <div className='mt-6 rounded-3xl bg-[#3a3a3a] p-6'>
        <div className='text-center'>
          <div className='text-sm font-semibold text-[#a6f36a]'>Invitation code</div>
          <div className='mt-3 text-2xl font-bold text-white'>{invitationCode}</div>
        </div>

        <div className='mt-6 flex justify-center'>
          <div className='rounded-2xl bg-white p-4'>
            <QRCode />
          </div>
        </div>

        <div className='mt-6 break-all text-center text-sm text-white/80'>{inviteUrl}</div>

        <button
          type='button'
          onClick={handleCopy}
          className='mt-6 w-full rounded-2xl bg-[#2dd4bf] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#26c4b0]'
        >
          {copied ? 'Copied!' : 'Copy address'}
        </button>
      </div>
    </div>
  )
}

export default InviteFriends
