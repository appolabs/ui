import * as React from "react"
import {Loader2, Send} from "lucide-react"

import {cn} from "../lib/utils"
import {Button} from "./button"
import {Textarea} from "./textarea"

export interface ChatComposerProps {
    onSend: (text: string) => Promise<unknown>
    placeholder: string
    sendLabel: string
    maxLength?: number
    onError?: (error: unknown) => void
    className?: string
}

/**
 * Message field with a send button. Enter sends, Shift+Enter adds a line.
 * The draft is cleared only after `onSend` resolves.
 */
function ChatComposer({
    onSend,
    placeholder,
    sendLabel,
    maxLength,
    onError,
    className,
}: ChatComposerProps) {
    const [draft, setDraft] = React.useState("")
    const [sending, setSending] = React.useState(false)
    const text = draft.trim()

    const send = async () => {
        if (!text || sending) {
            return
        }

        setSending(true)

        try {
            await onSend(text)
            setDraft("")
        } catch (error) {
            onError?.(error)
        } finally {
            setSending(false)
        }
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.nativeEvent.isComposing) {
            return
        }

        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            void send()
        }
    }

    return (
        <div className={cn("flex items-end gap-2", className)}>
            <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                aria-label={placeholder}
                maxLength={maxLength}
                rows={2}
                className="min-h-[44px] flex-1 resize-none"
            />
            <Button
                type="button"
                size="icon"
                onClick={() => void send()}
                disabled={sending || !text}
                aria-label={sendLabel}
            >
                {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Send className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}

export {ChatComposer}
