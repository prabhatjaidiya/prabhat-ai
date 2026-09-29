type ChatInputProps = {
  onSend: (message: string) => void
}

function ChatInput({ onSend }: ChatInputProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const input = form.elements.namedItem('message') as HTMLInputElement
    const message = input.value.trim()

    if (!message) return

    onSend(message)
    form.reset()
  }

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl gap-3"
      >
        <div className="flex flex-1 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
          <input
            name="message"
            type="text"
            placeholder="Ask Prabhat AI something..."
            className="min-w-0 flex-1 bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-lg text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
          aria-label="Send message"
        >
          ➤
        </button>
      </form>
    </footer>
  )
}

export default ChatInput