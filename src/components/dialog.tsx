import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import {cn} from "../lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({className, ...props}, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

interface DialogContentProps
    extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
    onCloseComplete?: () => void
    /** Render open immediately with no entry/exit animation. */
    instant?: boolean
}

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
>(({className, children, onCloseComplete, onAnimationEnd, instant, ...props}, ref) => {
    const handleAnimationEnd = React.useCallback(
        (e: React.AnimationEvent<HTMLDivElement>) => {
            onAnimationEnd?.(e)
            if (e.currentTarget.getAttribute("data-state") === "closed") {
                onCloseComplete?.()
            }
        },
        [onAnimationEnd, onCloseComplete]
    )

    return (
        <DialogPortal>
            <DialogOverlay className={instant ? "animate-none" : undefined} />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed left-[50%] top-[50%] z-50 flex max-h-[85vh] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border bg-background p-1 shadow-lg sm:rounded-lg",
                    !instant && "duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
                    className
                )}
                onAnimationEnd={instant ? undefined : handleAnimationEnd}
                {...props}
            >
                {children}
            </DialogPrimitive.Content>
        </DialogPortal>
    )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
                          className,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-shrink-0 flex-col space-y-1.5 px-4 pt-4 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogBody = ({
                        className,
                        ...props
                    }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex-1 overflow-y-auto hide-scrollbar px-4 pb-2",
            className
        )}
        {...props}
    />
)
DialogBody.displayName = "DialogBody"

const DialogFooter = ({
                          className,
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-shrink-0 flex-col-reverse gap-2 px-4 pb-4 sm:flex-row sm:justify-end",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

interface DialogStepsProps {
    currentStep: number
    totalSteps: number
    className?: string
}

/**
 * Step indicator pills for wizard dialogs.
 *
 * Place as the first child of DialogContent (before DialogHeader).
 * - Mobile: centered at the top edge of the sheet, like a grab indicator.
 * - Desktop (sm+): absolute top-right corner of the dialog.
 */
const DialogSteps = ({currentStep, totalSteps, className}: DialogStepsProps) => (
    <div className={cn(
        "flex items-center justify-center gap-1.5 pt-4 -mb-2",
        "sm:absolute sm:right-4 sm:top-4 sm:pt-0 sm:mb-0 sm:z-10",
        className
    )}>
        {Array.from({length: totalSteps}).map((_, index) => (
            <div
                key={index}
                className={cn(
                    "h-1.5 w-6 rounded-full transition-colors",
                    index < currentStep - 1
                        ? "bg-primary"
                        : index === currentStep - 1
                            ? "bg-primary/50"
                            : "bg-muted"
                )}
            />
        ))}
    </div>
)
DialogSteps.displayName = "DialogSteps"

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({className, ...props}, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({className, ...props}, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn("text-base text-muted-foreground", className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogSteps,
    DialogTitle,
    DialogDescription,
}
