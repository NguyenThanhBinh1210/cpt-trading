import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, CheckCircle, Clock, Image as ImageIcon, MessageSquare, Search, Send } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type TicketMessage = {
  id: string
  sender: 'user' | 'admin'
  type?: 'text' | 'image'
  content: string
  time: string
}

interface Ticket {
  id: string
  userId: string
  userName: string
  email: string
  subject: string
  category: 'Technical' | 'Account' | 'Trading' | 'Payment' | 'KYC' | 'General'
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed'
  createdDate: string
  lastReply?: string
  assignedTo?: string
  messages: TicketMessage[]
}

const initialTickets: Ticket[] = [
  {
    id: 'TKT001',
    userId: 'USR001',
    userName: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Unable to withdraw funds',
    category: 'Payment',
    priority: 'High',
    status: 'Open',
    createdDate: '2024-02-10 09:30:00',
    messages: [
      {
        id: 'TKT001-1',
        sender: 'user',
        content: 'I cannot withdraw funds from my account. Please assist.',
        time: '09:32'
      }
    ]
  },
  {
    id: 'TKT002',
    userId: 'USR002',
    userName: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    subject: 'Platform login issues',
    category: 'Technical',
    priority: 'Medium',
    status: 'In Progress',
    createdDate: '2024-02-10 08:15:00',
    lastReply: '2024-02-10 10:00:00',
    assignedTo: 'Admin User',
    messages: [
      {
        id: 'TKT002-1',
        sender: 'user',
        content: 'I am unable to login. The page keeps refreshing.',
        time: '08:20'
      },
      {
        id: 'TKT002-2',
        sender: 'admin',
        content: 'Thanks for reporting. Are you seeing any error message?',
        time: '09:10'
      },
      {
        id: 'TKT002-3',
        sender: 'user',
        content: 'No error, just redirects to the login screen again.',
        time: '09:15'
      }
    ]
  },
  {
    id: 'TKT003',
    userId: 'USR003',
    userName: 'Michael Chen',
    email: 'mchen@email.com',
    subject: 'KYC document verification status',
    category: 'KYC',
    priority: 'Low',
    status: 'Resolved',
    createdDate: '2024-02-09 14:20:00',
    lastReply: '2024-02-09 16:30:00',
    assignedTo: 'Support Team',
    messages: [
      {
        id: 'TKT003-1',
        sender: 'user',
        content: 'Can you confirm if my KYC documents are approved?',
        time: '14:22'
      },
      {
        id: 'TKT003-2',
        sender: 'admin',
        content: 'Your documents were approved. You can trade now.',
        time: '16:30'
      }
    ]
  },
  {
    id: 'TKT004',
    userId: 'USR004',
    userName: 'Emily Davis',
    email: 'emily.d@example.com',
    subject: 'How to increase leverage?',
    category: 'Trading',
    priority: 'Low',
    status: 'Open',
    createdDate: '2024-02-10 11:00:00',
    messages: [
      {
        id: 'TKT004-1',
        sender: 'user',
        content: 'How can I increase leverage for perpetual contracts?',
        time: '11:02'
      }
    ]
  },
  {
    id: 'TKT005',
    userId: 'USR005',
    userName: 'Robert Wilson',
    email: 'rwilson@company.com',
    subject: 'Account suspended without notice',
    category: 'Account',
    priority: 'Urgent',
    status: 'In Progress',
    createdDate: '2024-02-10 07:30:00',
    lastReply: '2024-02-10 08:00:00',
    assignedTo: 'Senior Support',
    messages: [
      {
        id: 'TKT005-1',
        sender: 'user',
        content: 'My account was suspended without any notification.',
        time: '07:31'
      },
      {
        id: 'TKT005-2',
        sender: 'admin',
        content: 'We are reviewing the account now. Please standby.',
        time: '08:00'
      }
    ]
  }
]

const Support = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)
  const [activeTicketId, setActiveTicketId] = useState(initialTickets[0]?.id ?? '')
  const [reply, setReply] = useState('')
  const [search, setSearch] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const chatScrollRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const emojis = useMemo(() => ['😀', '😂', '😍', '😎', '😭', '👍', '🙏', '🎉'], [])

  useEffect(() => {
    if (!activeTicketId && tickets[0]) {
      setActiveTicketId(tickets[0].id)
    }
  }, [activeTicketId, tickets])

  const activeTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === activeTicketId) ?? tickets[0],
    [tickets, activeTicketId]
  )

  const filteredTickets = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return tickets
    return tickets.filter((ticket) => {
      return (
        ticket.userName.toLowerCase().includes(keyword) ||
        ticket.subject.toLowerCase().includes(keyword) ||
        ticket.email.toLowerCase().includes(keyword) ||
        ticket.id.toLowerCase().includes(keyword)
      )
    })
  }, [search, tickets])

  const openTickets = tickets.filter((t) => t.status === 'Open')
  const inProgress = tickets.filter((t) => t.status === 'In Progress')
  const urgent = tickets.filter((t) => t.priority === 'Urgent')

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
      case 'High':
        return 'destructive'
      case 'Medium':
        return 'secondary'
      case 'Low':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'outline'
      case 'In Progress':
        return 'secondary'
      case 'Resolved':
      case 'Closed':
        return 'default'
      default:
        return 'default'
    }
  }

  const scrollToBottom = () => {
    const viewport = chatScrollRef.current?.querySelector(
      '[data-radix-scroll-area-viewport]'
    ) as HTMLDivElement | null
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
      return
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' })
  }

  useEffect(() => {
    requestAnimationFrame(scrollToBottom)
  }, [activeTicket?.messages.length])

  const appendMessage = (message: Omit<TicketMessage, 'id' | 'time'>, time?: string) => {
    if (!activeTicket) return
    const ticketId = activeTicket.id
    const now = time ?? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: ticket.status === 'Open' ? 'In Progress' : ticket.status,
              lastReply: now,
              messages: [
                ...ticket.messages,
                { id: `${ticketId}-${Date.now()}`, sender: message.sender, type: message.type, content: message.content, time: now }
              ]
            }
          : ticket
      )
    )
    setTimeout(scrollToBottom, 0)
  }

  const handleSend = () => {
    const trimmed = reply.trim()
    if (!trimmed || !activeTicket) return
    appendMessage({ sender: 'admin', type: 'text', content: trimmed })
    setReply('')
    setTimeout(scrollToBottom, 0)

    setTimeout(() => {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === activeTicket.id
            ? {
                ...ticket,
                messages: [
                  ...ticket.messages,
                  {
                    id: `${activeTicket.id}-${Date.now()}-reply`,
                    sender: 'user',
                    type: 'text',
                    content: 'Thanks, I am waiting for the update.',
                    time: now
                  }
                ]
              }
            : ticket
        )
      )
    }, 1200)
  }

  const handlePickEmoji = (emoji: string) => {
    setReply((prev) => `${prev}${emoji}`)
    setShowEmojiPicker(false)
  }

  const handleAttachImage = (file: File) => {
    const url = URL.createObjectURL(file)
    appendMessage({ sender: 'admin', type: 'image', content: url })
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Message Center</h1>
          <p className='text-muted-foreground'>Realtime conversations with users and support tickets</p>
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tickets</CardTitle>
            <MessageSquare className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{tickets.length}</div>
            <p className='text-xs text-muted-foreground'>All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Open Tickets</CardTitle>
            <AlertCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-orange-500'>{openTickets.length}</div>
            <p className='text-xs text-muted-foreground'>Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>In Progress</CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-blue-500'>{inProgress.length}</div>
            <p className='text-xs text-muted-foreground'>Being handled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Urgent</CardTitle>
            <CheckCircle className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-500'>{urgent.length}</div>
            <p className='text-xs text-muted-foreground'>High priority</p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 lg:grid-cols-[320px_1fr]'>
        <Card className='h-full'>
          <CardHeader className='space-y-2'>
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Active tickets and recent messages</CardDescription>
            <div className='relative'>
              <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                placeholder='Search by user, ticket, subject...'
                className='pl-8'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className='p-0'>
            <ScrollArea className='h-[60vh]'>
              <div className='space-y-1 p-2'>
                {filteredTickets.map((ticket) => {
                  const isActive = ticket.id === activeTicket?.id
                  const lastMessage = ticket.messages[ticket.messages.length - 1]
                  return (
                    <button
                      key={ticket.id}
                      type='button'
                      onClick={() => setActiveTicketId(ticket.id)}
                      className={`flex w-full flex-col gap-2 rounded-lg border p-3 text-left transition ${
                        isActive ? 'border-primary bg-accent' : 'border-transparent hover:bg-accent'
                      }`}
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage src={`https://avatar.vercel.sh/${ticket.userId}`} />
                            <AvatarFallback>{ticket.userName.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='text-sm font-medium'>{ticket.userName}</div>
                            <div className='text-xs text-muted-foreground'>{ticket.email}</div>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(ticket.status)} className='text-[10px]'>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className='text-xs text-muted-foreground line-clamp-2'>{ticket.subject}</div>
                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <span>{lastMessage?.content}</span>
                        <span>{lastMessage?.time}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className='flex h-full flex-col'>
          <CardHeader className='space-y-2'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>{activeTicket ? activeTicket.userName : 'No conversation selected'}</CardTitle>
                <CardDescription>{activeTicket?.email}</CardDescription>
              </div>
              {activeTicket && (
                <div className='flex items-center gap-2'>
                  <Badge variant={getStatusColor(activeTicket.status)}>{activeTicket.status}</Badge>
                  <Badge variant={getPriorityColor(activeTicket.priority)}>{activeTicket.priority}</Badge>
                </div>
              )}
            </div>
            {activeTicket && (
              <div className='text-sm text-muted-foreground'>
                Ticket {activeTicket.id} · {activeTicket.subject}
              </div>
            )}
          </CardHeader>
          <CardContent className='flex flex-1 flex-col gap-4'>
            <ScrollArea ref={chatScrollRef} className='h-[60vh] pr-4'>
              <div className='space-y-4'>
                {activeTicket?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                        message.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {message.type === 'image' ? (
                        <img src={message.content} alt='attachment' className='h-32 w-44 rounded-xl object-cover' />
                      ) : (
                        <div>{message.content}</div>
                      )}
                      <div className='mt-1 text-[10px] text-muted-foreground'>{message.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </ScrollArea>

            <div className='space-y-2'>
              <Textarea
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                placeholder='Type a reply...'
                rows={3}
              />
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <Button type='button' variant='outline' size='sm' onClick={() => setShowEmojiPicker((prev) => !prev)}>
                    🙂
                  </Button>
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
                  <Button type='button' variant='outline' size='sm' onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon className='mr-2 h-4 w-4' />
                    Image
                  </Button>
                </div>
                <Button onClick={handleSend} disabled={!reply.trim()}>
                  <Send className='mr-2 h-4 w-4' />
                  Send Reply
                </Button>
              </div>
              {showEmojiPicker && (
                <div className='flex flex-wrap gap-2 rounded-lg border bg-background p-3'>
                  {emojis.map((emoji) => (
                    <button key={emoji} type='button' className='text-xl' onClick={() => handlePickEmoji(emoji)}>
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Support
