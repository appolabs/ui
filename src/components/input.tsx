import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "../lib/utils"

const inputVariants = cva(
    "flex w-full rounded-md ring-offset-background file:border-0 file:bg-transparent file:font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default: [
                    "border border-input bg-background text-foreground",
                    "file:text-foreground placeholder:text-muted-foreground",
                    "focus-visible:ring-ring",
                ],
                glass: [
                    "border border-white/10 bg-white/5 text-white",
                    "placeholder:text-slate-500 focus:border-primary",
                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                ],
            },
            // Height/typographic scale. `size` collides with the native numeric
            // `size` attribute on <input>, so the axis is named `inputSize`.
            inputSize: {
                default: "h-10 px-3 py-2 text-base file:text-base",
                lg: "h-12 px-4 py-3 text-lg file:text-lg",
                xl: "h-14 px-5 py-4 text-xl file:text-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    }
)

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className, type, variant, inputSize, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(inputVariants({variant, inputSize, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input, inputVariants}
