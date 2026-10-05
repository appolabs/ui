import * as React from "react"

import {cn} from "../lib/utils"

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
    side: "start" | "end"
    author?: string
    timestamp?: React.ReactNode
}

/**
 * One message in a conversation. `end` is the viewer's own side.
 */
function ChatBubble({
    side,
    author,
    timestamp,
    className,
    children,
    ...props
}: ChatBubbleProps) {
    return (
        <div
            data-side={side}
            className={cn(
                "flex",
                side === "end" ? "justify-end" : "justify-start",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                    side === "end"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                )}
            >
                {author && (
                    <p className="mb-1 text-xs font-medium text-muted-foreground">
                        {author}
                    </p>
                )}
                <div className="whitespace-pre-wrap break-words">{children}</div>
                {timestamp && (
                    <span className="mt-1 block text-[11px] opacity-70">
                        {timestamp}
                    </span>
                )}
            </div>
        </div>
    )
}

export {ChatBubble}
