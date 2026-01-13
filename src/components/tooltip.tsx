import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import {cn} from "../lib/utils"

const TooltipProvider = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Provider>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({delayDuration = 0, ...props}, _ref) => (
    <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
))
TooltipProvider.displayName = "TooltipProvider"

type TooltipContextValue = {
    clickedOpen: boolean
    setClickedOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null)

interface TooltipProps
    extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
    children: React.ReactNode
}

const Tooltip = ({children, open, onOpenChange, ...props}: TooltipProps) => {
    const [clickedOpen, setClickedOpen] = React.useState(false)
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : clickedOpen || undefined

    const handleOpenChange = (newOpen: boolean) => {
        if (clickedOpen && !newOpen) {
            // Don't close from hover when clicked open
            return
        }
        onOpenChange?.(newOpen)
    }

    // Close on click outside
    React.useEffect(() => {
        if (!clickedOpen) return

        const handleClickOutside = () => {
            setClickedOpen(false)
        }

        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleClickOutside)
        }, 0)

        return () => {
            clearTimeout(timeoutId)
            document.removeEventListener("click", handleClickOutside)
        }
    }, [clickedOpen])

    return (
        <TooltipContext.Provider value={{clickedOpen, setClickedOpen}}>
            <TooltipPrimitive.Root
                open={isOpen}
                onOpenChange={handleOpenChange}
                {...props}
            >
                {children}
            </TooltipPrimitive.Root>
        </TooltipContext.Provider>
    )
}

const TooltipTrigger = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({onClick, ...props}, ref) => {
    const context = React.useContext(TooltipContext)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (context) {
            e.stopPropagation()
            context.setClickedOpen((prev) => !prev)
        }
        onClick?.(e)
    }

    return <TooltipPrimitive.Trigger ref={ref} onClick={handleClick} {...props} />
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({className, sideOffset = 4, ...props}, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-2.5 py-1 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {Tooltip, TooltipTrigger, TooltipContent, TooltipProvider}
