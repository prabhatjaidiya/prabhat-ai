import {
  Plus,
  X,
  MessageSquare,
  Command,
} from 'lucide-react'

type Conversation = {
  id: string
  title: string
  messages: { id: number; role: 'user' | 'ai'; content: string }[]
  updatedAt: number
}

type SidebarProps = {
  conversations: Conversation[]
  currentChatId: string
  isLoading: boolean
  isOpen: boolean
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onClose: () => void
}

function Sidebar({
  conversations,
  currentChatId,
  isLoading,
  isOpen,
  onNewChat,
  onSelectChat,
  onClose,
}: SidebarProps) {
  return (
    <aside
      id="chat-sidebar"
      aria-label="Conversation sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,85vw)] shrink-0 flex-col border-r border-white/[0.08] bg-[#0D1010] transition-transform duration-300 ease-out lg:static lg:z-auto md:w-72 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand */}
      <div className="px-4 pb-5 pt-5">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#6F967B]/30 bg-[#6F967B]/10">
              <span className="text-sm font-semibold text-[#A9C7B1]">
                P.
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-[#E7EBE8]">
                Prabhat AI
              </p>
              <p className="mt-0.5 text-[11px] text-[#78837D]">
                Personal assistant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="cursor-pointer rounded-lg p-2 text-[#929D96] transition hover:bg-white/[0.06] md:hidden"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={onNewChat}
          disabled={isLoading}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.035] px-3.5 py-3 text-sm text-[#DDE3DF] transition hover:border-[#6F967B]/40 hover:bg-[#6F967B]/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.07] text-[#A9C7B1]">
            <Plus size={18} aria-hidden="true" />
          </span>

          <span className="font-medium">New conversation</span>

          <span className="ml-auto flex items-center gap-1 text-xs text-[#68736D]">
            <Command size={12} aria-hidden="true" />
            K
          </span>
        </button>
      </div>

      {/* Conversation history */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#78837D]">
            Recent conversations
          </p>

          <span className="text-[10px] tabular-nums text-[#59645E]">
            {conversations.length}
          </span>
        </div>

        {conversations.length === 0 ? (
          <p className="px-2 py-4 text-xs leading-5 text-[#78837D]">
            Your conversations will appear here.
          </p>
        ) : (
          <div className="space-y-1">
            {conversations.map((chat) => {
              const isActive = chat.id === currentChatId

              return (
                <button
                  key={chat.id}
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  disabled={isLoading}
                  title={chat.title}
                  className={`relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    isActive
                      ? 'bg-[#6F967B]/[0.12] text-[#E6EEE8]'
                      : 'text-[#929D96] hover:bg-white/[0.045] hover:text-[#DDE3DF]'
                  }`}
                >
                  <MessageSquare
                    size={16}
                    className={`shrink-0 ${
                      isActive
                        ? 'text-[#A9C7B1]'
                        : 'text-[#69756E]'
                    }`}
                    aria-hidden="true"
                  />

                  <span className="min-w-0 flex-1 truncate text-[13px]">
                    {chat.title || 'Untitled conversation'}
                  </span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A9C7B1]" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Session indicator */}
      <div className="border-t border-white/[0.07] p-4">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[#82A98D]" />

          <div>
            <p className="text-xs text-[#AAB4AD]">Session active</p>
            <p className="mt-0.5 text-[10px] text-[#66716A]">
              Conversations are temporary
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar