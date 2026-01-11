import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../lib/utils"

const glassCardVariants = cva(
    "rounded-2xl border backdrop-blur-xl transition-all duration-300",
    {
        variants: {
            variant: {
                default: [
                    "bg-white/70 border-gray-200/50 shadow-sm",
                    "dark:bg-white/5 dark:border-white/10 dark:shadow-lg",
                ],
                elevated: [
                    "bg-white/80 border-gray-200/50 shadow-lg",
                    "dark:bg-white/5 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                ],
                interactive: [
                    "bg-white/70 border-gray-200/50 shadow-sm cursor-pointer",
                    "hover:bg-white/90 hover:border-gray-300/60 hover:shadow-md hover:-translate-y-0.5",
                    "dark:bg-white/5 dark:border-white/10 dark:shadow-lg",
                    "dark:hover:bg-white/10 dark:hover:border-white/20 dark:hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]",
                ],
                hero: [
                    "bg-gradient-to-br from-white/80 via-white/70 to-purple-50/50 border-gray-200/50 shadow-lg",
                    "dark:from-white/10 dark:via-white/5 dark:to-purple-900/10 dark:border-white/10",
                ],
                stat: [
                    "bg-white/60 border-gray-200/40 shadow-sm",
                    "dark:bg-white/[0.03] dark:border-white/[0.08]",
                ],
            },
            padding: {
                none: "",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "none",
        },
    }
)

export interface GlassCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({className, variant, padding, ...props}, ref) => (
        <div
            ref={ref}
            className={cn(glassCardVariants({variant, padding, className}))}
            {...props}
        />
    )
)
GlassCard.displayName = "GlassCard"

const GlassCardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
))
GlassCardHeader.displayName = "GlassCardHeader"

const GlassCardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({className, ...props}, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
GlassCardTitle.displayName = "GlassCardTitle"

const GlassCardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
GlassCardDescription.displayName = "GlassCardDescription"

const GlassCardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
GlassCardContent.displayName = "GlassCardContent"

const GlassCardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
))
GlassCardFooter.displayName = "GlassCardFooter"

export {
    GlassCard,
    GlassCardHeader,
    GlassCardFooter,
    GlassCardTitle,
    GlassCardDescription,
    GlassCardContent,
    glassCardVariants,
}
