function ChatHeader() {
  return (
    <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm">
            ✨
          </div>

          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Prabhat AI
            </h1>

            <p className="text-xs text-gray-500">
              Your personal AI assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-xs font-medium text-green-700">
            Online
          </span>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader