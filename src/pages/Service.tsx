import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ChatMessage = {
  id: string
  type: 'text' | 'image'
  content: string
}

const Service = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)

  const emojis = useMemo(() => ['😀', '😂', '😍', '😎', '😭', '👍', '🙏', '🎉'], [])

  const handleSendMessage = () => {
    const trimmed = message.trim()
    if (!trimmed) return
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, type: 'text', content: trimmed }])
    setMessage('')
  }

  const handlePickEmoji = (emoji: string) => {
    setMessage((prev) => `${prev}${emoji}`)
    setShowEmojiPicker(false)
  }

  const handleAttachImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setMessages((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, type: 'image', content: url }])
  }

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  return (
    <div className='flex min-h-screen flex-col bg-[#f8f6ef] text-[#1f2937]'>
      <div className='sticky top-0 z-20 bg-[#1f1f1f] px-4 pb-4 pt-4 text-white'>
        <div className='relative flex items-center justify-center '>
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
          <h1 className='text-base font-semibold'>Service</h1>
        </div>
      </div>

      <div className='mx-4 overflow-hidden rounded-2xl bg-gradient-to-b from-[#2c6bd6] to-[#255ab8] p-4 text-white shadow-sm'>
        <div className='flex items-center justify-between'>
          <button className='flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white'>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M7 8h10M7 12h6M5 6h14v10H8l-3 3V6Z' stroke='currentColor' strokeWidth='1.4' />
            </svg>
            Cuộc hội thoại
          </button>
          <svg width='14' height='14' viewBox='0 0 24 24' fill='none'>
            <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' />
          </svg>
        </div>
        <div className='mt-4 flex items-center gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-xs font-bold'>
            CPT
          </div>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-xs font-bold'>
            CPT
          </div>
        </div>
        <div className='mt-3 text-sm font-semibold'>Bạn có câu hỏi? Hãy trò chuyện với tôi!</div>
      </div>

      <div className='flex min-h-0 flex-1 flex-col'>
        <div ref={chatScrollRef} className='flex-1 overflow-y-auto px-4 pb-6 pt-4'>
          <div className='flex items-start gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-[10px] font-bold text-white'>
              CPT
            </div>
            <div className='rounded-2xl bg-white px-4 py-2 text-sm text-[#1f2937] shadow-sm'>
              Xin chào! Tôi có thể giúp bạn như thế nào?
            </div>
          </div>

          <div className='mt-4 text-center text-xs text-[#6b7280]'>Thứ sáu, 30 Tháng một</div>

          <div className='mt-4 flex items-start gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#0f172a] text-[10px] font-bold text-white'>
              CPT
            </div>
            <div className='rounded-2xl bg-white px-4 py-3 text-sm text-[#1f2937] shadow-sm'>
              <div className='font-semibold'>Giữ thông tin liên lạc với nhau</div>
              <div className='mt-1 text-xs text-[#6b7280]'>Bạn có muốn kết nối với chúng tôi không?</div>
              <button
                type='button'
                className='mt-3 inline-flex items-center gap-2 rounded-full border border-[#3b82f6] px-4 py-1.5 text-xs font-semibold text-[#3b82f6]'
              >
                <span className='rounded-full bg-[#f3f4f6] px-2 py-0.5'>✉️</span>
                Email
              </button>
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <div className='max-w-[70%] rounded-2xl bg-[#3b82f6] px-4 py-2 text-sm text-white shadow-sm'>dff</div>
          </div>

          <div className='mt-3 flex justify-end'>
            <div className='rounded-2xl bg-white px-3 py-2 text-2xl'>😂</div>
          </div>

          <div className='mt-4 flex justify-end'>
            <div className='h-28 w-40 rounded-2xl bg-[#0f172a]' />
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className='mt-4 flex justify-end'>
              {msg.type === 'text' ? (
                <div className='max-w-[70%] rounded-2xl bg-[#3b82f6] px-4 py-2 text-sm text-white shadow-sm'>
                  {msg.content}
                </div>
              ) : (
                <img src={msg.content} alt='attachment' className='h-28 w-40 rounded-2xl object-cover shadow-sm' />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className='sticky bottom-0 border-t border-[#e5e7eb] bg-white px-4 pb-6 pt-3'>
          <div className='rounded-xl bg-[#fff7d1] px-3 py-2 text-xs text-[#6b7280]'>
            🔔 Vui lòng thiết lập email của bạn để tiếp tục.
          </div>
          <div className='mt-3 flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-white px-3 py-2'>
            <button type='button' className='text-[#9ca3af]' onClick={() => setShowEmojiPicker((prev) => !prev)}>
              🙂
            </button>
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder='Nhập tin nhắn ...'
              className='flex-1 bg-transparent text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none'
            />
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  handleAttachImage(file)
                  event.currentTarget.value = ''
                }
              }}
            />
            <button type='button' className='text-[#9ca3af]' onClick={() => fileInputRef.current?.click()}>
              📎
            </button>
            <button
              type='button'
              className={message.trim() ? 'text-[#3b82f6]' : 'text-[#9ca3af]'}
              onClick={handleSendMessage}
            >
              ➤
            </button>
          </div>
          {showEmojiPicker && (
            <div className='mt-3 flex flex-wrap gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-3 py-2'>
              {emojis.map((emoji) => (
                <button key={emoji} type='button' className='text-xl' onClick={() => handlePickEmoji(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Service
