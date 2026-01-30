type LanguageSheetProps = {
  isOpen: boolean
  selected: string
  onClose: () => void
  onSelect: (code: string) => void
}

const LanguageSheet = ({ isOpen, selected, onClose, onSelect }: LanguageSheetProps) => {
  const languages = [
    {
      code: 'en',
      label: 'English',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#1E3A8A' />
          <rect y='2' width='28' height='2' fill='#F97316' />
          <rect y='6' width='28' height='2' fill='#F97316' />
          <rect y='10' width='28' height='2' fill='#F97316' />
          <rect y='14' width='28' height='2' fill='#F97316' />
          <rect y='18' width='28' height='2' fill='#F97316' />
          <rect width='12' height='10' fill='#2563EB' />
          <rect x='1' y='1' width='10' height='8' fill='#3B82F6' />
        </svg>
      )
    },
    {
      code: 'ja',
      label: '日本語',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#F8FAFC' />
          <circle cx='14' cy='10' r='5' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'ko',
      label: '한국어',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#F8FAFC' />
          <circle cx='14' cy='10' r='4' fill='#DC2626' />
          <path d='M14 6a4 4 0 0 1 0 8' stroke='#2563EB' strokeWidth='2' />
        </svg>
      )
    },
    {
      code: 'zh-tw',
      label: '繁體中文',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <rect width='12' height='10' fill='#2563EB' />
          <circle cx='6' cy='5' r='2.5' fill='#F8FAFC' />
        </svg>
      )
    },
    {
      code: 'th',
      label: 'ไทย',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <rect y='4' width='28' height='12' fill='#F8FAFC' />
          <rect y='6' width='28' height='8' fill='#1D4ED8' />
        </svg>
      )
    },
    {
      code: 'vi',
      label: 'Tiếng Việt',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <polygon points='14,5 16,10 21,10 17,13 19,18 14,15 9,18 11,13 7,10 12,10' fill='#FBBF24' />
        </svg>
      )
    },
    {
      code: 'fr',
      label: 'français',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#F8FAFC' />
          <rect width='9' height='20' fill='#2563EB' />
          <rect x='19' width='9' height='20' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'de',
      label: 'Deutsche',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#111827' />
          <rect y='7' width='28' height='6' fill='#F59E0B' />
          <rect y='13' width='28' height='7' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'ru',
      label: 'Русский язык',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#F8FAFC' />
          <rect y='7' width='28' height='6' fill='#2563EB' />
          <rect y='13' width='28' height='7' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'es',
      label: 'Español',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <rect y='5' width='28' height='10' fill='#FBBF24' />
        </svg>
      )
    },
    {
      code: 'pt',
      label: 'Português',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <rect width='11' height='20' fill='#16A34A' />
          <circle cx='11' cy='10' r='4' fill='#FBBF24' />
        </svg>
      )
    },
    {
      code: 'it',
      label: 'Italiano',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#F8FAFC' />
          <rect width='9' height='20' fill='#16A34A' />
          <rect x='19' width='9' height='20' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'ar',
      label: 'عربي',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#16A34A' />
          <rect y='7' width='28' height='6' fill='#F8FAFC' />
          <rect y='13' width='28' height='7' fill='#111827' />
        </svg>
      )
    },
    {
      code: 'tr',
      label: 'Türkçe',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='20' rx='3' fill='#DC2626' />
          <circle cx='11' cy='10' r='4' fill='#F8FAFC' />
          <circle cx='12.5' cy='10' r='3' fill='#DC2626' />
        </svg>
      )
    },
    {
      code: 'id',
      label: 'Indonesia',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='10' rx='3' fill='#DC2626' />
          <rect y='10' width='28' height='10' fill='#F8FAFC' />
        </svg>
      )
    },
    {
      code: 'fa',
      label: 'فارسی',
      flag: (
        <svg width='28' height='20' viewBox='0 0 28 20' fill='none' aria-hidden='true'>
          <rect width='28' height='7' rx='3' fill='#16A34A' />
          <rect y='7' width='28' height='6' fill='#F8FAFC' />
          <rect y='13' width='28' height='7' fill='#DC2626' />
        </svg>
      )
    }
  ]

  if (!isOpen) {
    return null
  }

  return (
    <div className='px-4 pt-4 text-white'>
      <div className='relative flex items-center justify-center pb-4'>
        <button
          type='button'
          onClick={onClose}
          className='absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white/80'
          aria-label='Back'
        >
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
            <path d='M15 6l-6 6 6 6' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
          </svg>
        </button>
        <h2 className='text-base font-semibold'>Language</h2>
      </div>

      <div className='space-y-3 overflow-y-auto pb-6'>
        {languages.map((language) => {
          const isActive = language.code === selected
          return (
            <button
              key={language.code}
              type='button'
              onClick={() => onSelect(language.code)}
              className='flex w-full items-center gap-4 rounded-2xl bg-[#3b3b3b] px-4 py-4 text-left'
            >
              <span className='flex h-8 w-11 items-center justify-center overflow-hidden rounded-lg bg-[#111827]'>
                {language.flag}
              </span>
              <span className={`text-sm font-semibold ${isActive ? 'text-[#2dd4bf]' : 'text-white/80'}`}>
                {language.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LanguageSheet
