import { useEffect, useState } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import Sidebar from './components/Sidebar'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

type Conversation = {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

const CHATS_KEY = 'prabhat-ai-chats'
const ACTIVE_CHAT_KEY = 'prabhat-ai-active-chat'

function createConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: 'New chat',
    messages: [],
    updatedAt: Date.now(),
  }
}

function loadConversations(): Conversation[] {
  try {
    const saved = sessionStorage.getItem(CHATS_KEY)

    if (saved) {
      const parsed: unknown = JSON.parse(saved)

      if (Array.isArray(parsed)) {
        return parsed as Conversation[]
      }
    }
  } catch (error) {
    console.error('Could not restore chats:', error)
  }

  return [createConversation()]
}

function generateChatTitle(message: string): string {
  const cleaned = message
    .trim()
    .replace(/https?:\/\/\S+/gi, '')
    .replace(/[^\p{L}\p{N}\s'-]/gu, '')
    .replace(/\s+/g, ' ')

  if (!cleaned) return 'New chat'

  const normalized = cleaned
    .replace(/^(please\s+)?(can you|could you|would you)\s+/i, '')
    .replace(/^(please\s+)?(tell me|explain to me|show me)\s+/i, '')
    .replace(/^what (are|is|were|was)\s+(my|the)\s+/i, '$2 ')
    .trim()

  const words = normalized.split(' ').slice(0, 6)

  const title = words.join(' ')
  return title.length > 1
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : 'New chat'
}

function App() {
  const [conversations, setConversations] =
    useState<Conversation[]>(loadConversations)

  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      return (
        sessionStorage.getItem(ACTIVE_CHAT_KEY) || ''
      )
    } catch {
      return ''
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Ensure the selected chat exists after restoring the session.
  const currentChatId = conversations.some(
    (chat) => chat.id === activeChatId
  )
    ? activeChatId
    : conversations[0]?.id ?? ''

  const activeChat = conversations.find(
    (chat) => chat.id === currentChatId
  )

  const messages = activeChat?.messages ?? []

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    sessionStorage.setItem(
      CHATS_KEY,
      JSON.stringify(conversations)
    )
  }, [conversations])

  useEffect(() => {
    sessionStorage.setItem(
      ACTIVE_CHAT_KEY,
      currentChatId
    )
  }, [currentChatId])

  const updateChatMessages = (
    chatId: string,
    update: (messages: Message[]) => Message[]
  ) => {
    setConversations((current) =>
      current
        .map((chat) =>
          chat.id === chatId
            ? {
              ...chat,
              messages: update(chat.messages),
              updatedAt: Date.now(),
            }
            : chat
        )
        .sort((a, b) => b.updatedAt - a.updatedAt)
    )
  }

  const handleNewChat = () => {
    if (isLoading) return

    const chat = createConversation()

    setConversations((current) => [chat, ...current])
    setActiveChatId(chat.id)
    setError('')
  }

  const handleSend = async (message: string) => {
    if (isLoading || !currentChatId) return

    const conversationId = currentChatId

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: message,
    }

    setConversations((current) =>
      current
        .map((chat) =>
          chat.id === conversationId
            ? {
              ...chat,
              messages: [...chat.messages, userMessage],
              title:
                chat.messages.length === 0
                  ? generateChatTitle(message)
                  : chat.title,
              updatedAt: Date.now(),
            }
            : chat
        )
        .sort((a, b) => b.updatedAt - a.updatedAt)
    )

    setIsLoading(true)
    setError('')

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL || 'http://localhost:5000'
      ).replace(/\/+$/, '')

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          message,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || 'Failed to get AI response'
        )
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: data.response,
      }

      updateChatMessages(conversationId, (current) => [
        ...current,
        aiMessage,
      ])
    } catch (err) {
      console.error('Chat request failed:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to Prabhat AI. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-[#0B0D0D] text-[#E7EBE8]">
      <Sidebar
        conversations={conversations}
        currentChatId={currentChatId}
        isLoading={isLoading}
        isOpen={isSidebarOpen}
        onNewChat={() => {
          handleNewChat()
          setIsSidebarOpen(false)
        }}
        onSelectChat={(id) => {
          if (isLoading) return
          setActiveChatId(id)
          setError('')
          setIsSidebarOpen(false)
        }}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close conversation sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Main chat */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <MessageList
          messages={messages}
          onSuggestionClick={handleSend}
        />

        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            className="mx-auto w-full max-w-3xl px-4 pb-3 text-xs text-[#8C9691] sm:px-6"
          >
            Prabhat AI is thinking...
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 pb-3 text-sm text-[#D7A77E] sm:px-6"
          >
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError('')}
              className="shrink-0 underline underline-offset-4"
            >
              Dismiss
            </button>
          </div>
        )}

        <ChatInput onSend={handleSend} />
      </main>
    </div>
  )
}

export default App