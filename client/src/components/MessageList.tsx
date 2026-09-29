import MessageBubble from './MessageBubble'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

type MessageListProps = {
  messages: Message[]
}

function MessageList({ messages }: MessageListProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-linear-to-b from-gray-50 to-white px-4 py-8">
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