type ChatHeaderProps = {
  onMenuClick: () => void
}

function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.07] bg-[#0B0D0D]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open conversation sidebar"
            aria-controls="chat-sidebar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#B7C1BA] transition hover:bg-white/[0.06] lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#244538] text-[#E8DFD0]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"
                strokeLinejoin="round"
              />
              <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
            </svg>
          </div>

          <div className="min-w-0 space-y-0.5">
            <h1 className="truncate text-[15px] font-semibold tracking-[-0.03em] text-[#E8DFD0]">
              Prabhat AI
            </h1>
            <p className="truncate text-xs text-[#8C9691]">
              Your personal AI assistant
            </p>
          </div>
        </div>

        <div className="ml-2 flex shrink-0 items-center gap-2 rounded-full border border-white/[0.07] px-2.5 py-1.5 sm:px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#75B994]" />
          <span className="text-[11px] font-medium tracking-wide text-[#B7C1BA]">
            Online
          </span>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader