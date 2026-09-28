import MessageBubble from './MessageBubble'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

const messages: Message[] = [
  {
    id: 1,
    role: 'ai',
    content: 'Hello! I am Prabhat AI, your personal AI assistant.',
  },
  {
    id: 2,
    role: 'user',
    content: 'Tell me about yourself.',
  },
  {
    id: 3,
    role: 'ai',
    content:
      'I am designed to know about your background, skills, projects, and learning journey.',
  },
]

function MessageList() {
  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-4 py-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </div>
    </main>
  )
}

export default MessageList