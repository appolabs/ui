import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../lib/utils"

const glassOverlayVariants = cva(
    "fixed inset-0 transition-all duration-300",
    {
        variants: {
            variant: {
                subtle: "bg-black/20",
                default: "bg-black/40",
                dark: "bg-black/60",
                light: "bg-white/40",
            },
            blur: {
                none: "",
                sm: "backdrop-blur-sm",
                default: "backdrop-blur-glass",
                strong: "backdrop-blur-glass-strong",
            },
        },
        defaultVariants: {
            variant: "default",
            blur: "default",
        },
    }
)

export interface GlassOverlayProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof glassOverlayVariants> {
    open?: boolean
    onClose?: () => void
}

const GlassOverlay = React.forwardRef<HTMLDivElement, GlassOverlayProps>(
    ({className, variant, blur, open = true, onClose, ...props}, ref) => {
        if (!open) return null

        return (
            <div
                ref={ref}
                role="presentation"
                aria-hidden="true"
                onClick={onClose}
                className={cn(glassOverlayVariants({variant, blur, className}))}
                {...props}
            />
        )
    }
)
GlassOverlay.displayName = "GlassOverlay"

export {GlassOverlay, glassOverlayVariants}
