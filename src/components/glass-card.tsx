import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../lib/utils"

const glassCardVariants = cva(
    "rounded-2xl border backdrop-blur-glass transition-all duration-300",
    {
        variants: {
            variant: {
                default: [
                    "bg-glass border-glass-border shadow-glass",
                ],
                elevated: [
                    "bg-glass-elevated border-glass-border shadow-glass-elevated",
                ],
                subtle: [
                    "bg-glass-subtle border-glass-border-subtle",
                ],
                interactive: [
                    "bg-glass border-glass-border shadow-glass cursor-pointer",
                    "hover:bg-glass-elevated hover:shadow-glass-elevated hover:-translate-y-0.5",
                ],
                hero: [
                    "bg-gradient-to-br from-glass-elevated via-glass to-primary/5 border-glass-border shadow-glass-elevated",
                ],
                stat: [
                    "bg-glass-subtle border-glass-border-subtle",
                ],
                auth: [
                    "bg-glass border-glass-border shadow-glass-elevated backdrop-blur-glass-strong",
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
            "text-lg font-semibold leading-none tracking-tight text-glass-foreground",
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
        className={cn("text-sm text-glass-foreground-muted", className)}
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
