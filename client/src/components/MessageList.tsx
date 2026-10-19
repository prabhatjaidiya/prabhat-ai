import { useEffect, useRef, useState } from 'react'
import MessageBubble from './MessageBubble'
import { ArrowDown } from "lucide-react";

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

type MessageListProps = {
  messages: Message[]
  onSuggestionClick?: (message: string) => void
}

const suggestions = [
  {
    title: 'Professional background',
    description: 'Education, goals and career journey',
    prompt: "Tell me about Prabhat's professional background and career goals.",
    icon: '01',
  },
  {
    title: 'Explore my projects',
    description: 'ShopSphere, Prabhat AI and more',
    prompt: "Tell me about Prabhat's projects and the technologies used.",
    icon: '02',
  },
  {
    title: 'Technical skills',
    description: 'Frontend, backend and AI engineering',
    prompt: "What are Prabhat's technical skills and strengths?",
    icon: '03',
  },
  {
    title: 'Learning journey',
    description: 'Roadmaps, milestones and progress',
    prompt: "Explain Prabhat's learning journey and current progress.",
    icon: '04',
  },
]

function MessageList({
  messages,
  onSuggestionClick,
}: MessageListProps) {
  const scrollContainerRef = useRef<HTMLElement>(null)
  const latestMessageRef = useRef<HTMLDivElement>(null)
  const [showLatestButton, setShowLatestButton] = useState(false)
  const isNearBottomRef = useRef(true)

  const scrollToLatest = (behavior: ScrollBehavior = 'smooth') => {
    latestMessageRef.current?.scrollIntoView({
      behavior,
      block: 'end',
    })
  }

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const distanceFromBottom =
      container.scrollHeight -
      container.scrollTop -
      container.clientHeight

    const isNearBottom = distanceFromBottom < 120

    isNearBottomRef.current = isNearBottom
    setShowLatestButton(!isNearBottom)
  }

  useEffect(() => {
    if (!isNearBottomRef.current) return

    const frameId = requestAnimationFrame(() => {
      scrollToLatest('smooth')
    })

    return () => cancelAnimationFrame(frameId)
  }, [messages])

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <main
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-8 sm:px-6 sm:pt-6 sm:pb-8"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">
          {messages.length === 0 ? (
            <section className="flex flex-1 flex-col items-center justify-center py-4 sm:justify-start sm:pt-4 sm:pb-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#171B1A] text-[#D7A77E]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3Z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-[#8C9691]">
                A professional introduction
              </p>

              <h2 className="max-w-xl text-center text-3xl font-medium leading-tight tracking-[-0.045em] text-[#E8DFD0] sm:text-4xl">
                Get to know Prabhat
                <span className="text-[#82978A]"> Jaidiya.</span>
              </h2>

              <p className="mt-4 max-w-md text-center text-sm leading-6 text-[#8C9691]">
                Explore my professional background, technical skills,
                projects, and journey toward becoming a full-stack
                and AI engineer.
              </p>

              <div className="mt-6 grid w-full max-w-2xl grid-cols-1 gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.title}
                    type="button"
                    onClick={() => onSuggestionClick?.(suggestion.prompt)}
                    className="group w-full cursor-pointer rounded-xl border border-white/[0.08] bg-[#111514] px-4 py-3 text-left transition-colors duration-200 hover:border-[#506B5B] hover:bg-[#171D19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#82978A] sm:p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="shrink-0 text-xs tracking-widest text-[#D7A77E] sm:hidden">
                        {suggestion.icon}
                      </span>

                      <h3 className="min-w-0 flex-1 truncate text-sm font-medium text-[#E8DFD0] sm:mt-5">
                        {suggestion.title}
                      </h3>

                      <span className="shrink-0 text-[#68746D] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>

                    <p className="mt-1 hidden text-xs leading-5 text-[#8C9691] sm:block">
                      {suggestion.description}
                    </p>

                    <span className="hidden text-xs tracking-widest text-[#D7A77E] sm:block">
                      {suggestion.icon}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id}
                ref={index === messages.length - 1 ? latestMessageRef : null}
              >
                <MessageBubble
                  role={message.role}
                  content={message.content}
                />
              </div>
            ))
          )}
        </div>
      </main>

      {messages.length > 0 && showLatestButton && (
        <button
          type="button"
          onClick={() => scrollToLatest()}
          aria-label="Jump to newest message"
          className="absolute bottom-3 left-1/2 z-20
  flex -translate-x-1/2 cursor-pointer items-center justify-center
  rounded-full border border-white/10 bg-[#244538]
  p-3 text-[#E8DFD0] shadow-lg transition
  hover:bg-[#315744]
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-[#82978A]"
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  )
}

export default MessageList