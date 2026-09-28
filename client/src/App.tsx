import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </div>
  )
}

export default App