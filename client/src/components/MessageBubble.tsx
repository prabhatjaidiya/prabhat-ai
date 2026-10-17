import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MessageBubbleProps = {
  role: 'user' | 'ai'
  content: string
}

function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`w-fit max-w-[88%] min-w-0 break-words rounded-2xl px-4 py-3 text-sm leading-7 sm:max-w-[80%] ${isUser
            ? 'rounded-br-md bg-[#244538] text-[#F0EEE7] whitespace-pre-wrap'
            : 'rounded-bl-md border border-white/[0.08] bg-[#141817] text-[#D5DCD6]'
          }`}
      >
        {isUser ? (
          content
        ) : (
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9bbba5] underline underline-offset-4 hover:text-[#c0d8c7] break-all"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBubble