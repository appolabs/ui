import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../lib/utils"

const glassHeaderVariants = cva(
    "rounded-2xl border border-glass-border backdrop-blur-glass shadow-glass transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-glass",
                elevated: "bg-glass-elevated shadow-glass-elevated",
                transparent: "bg-transparent border-transparent shadow-none",
            },
            sticky: {
                true: "sticky top-0 z-50",
                false: "",
            },
            padding: {
                none: "",
                sm: "px-4 py-2",
                default: "px-4 py-3",
                lg: "px-6 py-4",
            },
        },
        defaultVariants: {
            variant: "default",
            sticky: false,
            padding: "default",
        },
    }
)

export interface GlassHeaderProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof glassHeaderVariants> {
    as?: "header" | "div" | "nav"
}

const GlassHeader = React.forwardRef<HTMLElement, GlassHeaderProps>(
    ({className, variant, sticky, padding, as: Component = "header", ...props}, ref) => {
        return (
            <Component
                // @ts-expect-error - polymorphic ref type
                ref={ref}
                className={cn(glassHeaderVariants({variant, sticky, padding, className}))}
                {...props}
            />
        )
    }
)
GlassHeader.displayName = "GlassHeader"

export {GlassHeader, glassHeaderVariants}
