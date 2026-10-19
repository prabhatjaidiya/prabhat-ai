import { useState } from 'react'
import { ArrowUp } from 'lucide-react'

type ChatInputProps = {
  onSend: (message: string) => void
}

function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    onSend(trimmedMessage)
    setMessage('')
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      event.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <footer className="sticky bottom-0 border-t border-white/[0.07] bg-[#0B0D0D]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="flex items-end gap-3 rounded-full border border-white/[0.1] bg-[#141817] px-3 py-2 transition-colors focus-within:border-[#506B5B]">
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            maxLength={4000}
            placeholder="Ask Prabhat AI anything..."
            aria-label="Message Prabhat AI"
            className="max-h-40 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-6 text-[#E8DFD0] outline-none placeholder:text-[#68746D]"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            aria-label="Send message"
            className="mb-0.5 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#244538] text-[#E8DFD0] transition-colors hover:bg-[#315744] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82978A] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </form>
    </footer>
  )
}

export default ChatInput