import { useState } from 'react'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = async (message: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: message,
    }

    setMessages((current) => [...current, userMessage])

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: data.response,
      }

      setMessages((current) => [...current, aiMessage])
    } catch {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'ai',
        content: 'Unable to connect to the server.',
      }

      setMessages((current) => [...current, errorMessage])
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ChatHeader />
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  )
}

export default App