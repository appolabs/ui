import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {X} from "lucide-react"

import {cn} from "../lib/utils"

const bannerVariants = cva(
    "rounded-xl border p-4",
    {
        variants: {
            variant: {
                info: "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20",
                warning: "border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20",
                destructive: "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20",
                success: "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
)

const bannerIconVariants = cva(
    "mt-0.5 h-5 w-5 flex-shrink-0",
    {
        variants: {
            variant: {
                info: "text-blue-600 dark:text-blue-400",
                warning: "text-amber-600 dark:text-amber-400",
                destructive: "text-red-600 dark:text-red-400",
                success: "text-emerald-600 dark:text-emerald-400",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
)

const bannerTitleVariants = cva(
    "font-medium",
    {
        variants: {
            variant: {
                info: "text-blue-900 dark:text-blue-100",
                warning: "text-amber-900 dark:text-amber-100",
                destructive: "text-red-900 dark:text-red-100",
                success: "text-emerald-900 dark:text-emerald-100",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
)

const bannerDescriptionVariants = cva(
    "mt-1 text-sm",
    {
        variants: {
            variant: {
                info: "text-blue-700 dark:text-blue-300",
                warning: "text-amber-700 dark:text-amber-300",
                destructive: "text-red-700 dark:text-red-300",
                success: "text-emerald-700 dark:text-emerald-300",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
)

const bannerDismissVariants = cva(
    "h-8 w-8 inline-flex items-center justify-center rounded-md transition-colors",
    {
        variants: {
            variant: {
                info: "text-blue-700 hover:text-blue-900 hover:bg-blue-100 dark:text-blue-300 dark:hover:text-blue-100 dark:hover:bg-blue-800/50",
                warning: "text-amber-700 hover:text-amber-900 hover:bg-amber-100 dark:text-amber-300 dark:hover:text-amber-100 dark:hover:bg-amber-800/50",
                destructive: "text-red-700 hover:text-red-900 hover:bg-red-100 dark:text-red-300 dark:hover:text-red-100 dark:hover:bg-red-800/50",
                success: "text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:text-emerald-100 dark:hover:bg-emerald-800/50",
            },
        },
        defaultVariants: {
            variant: "info",
        },
    }
)

type BannerVariant = VariantProps<typeof bannerVariants>["variant"]

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: BannerVariant
    icon?: React.ReactNode
    onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
    ({className, variant, icon, onDismiss, children, ...props}, ref) => (
        <div
            ref={ref}
            role="status"
            className={cn(bannerVariants({variant}), className)}
            {...props}
        >
            {(icon || onDismiss) && (
                <div className="flex items-start">
                    {icon && (
                        <div className={cn(bannerIconVariants({variant}))}>
                            {icon}
                        </div>
                    )}
                    {onDismiss && (
                        <button
                            type="button"
                            onClick={onDismiss}
                            className={cn(bannerDismissVariants({variant}), "ml-auto flex-shrink-0")}
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Dismiss</span>
                        </button>
                    )}
                </div>
            )}
            <div className={cn("min-w-0", (icon || onDismiss) && "mt-3")}>
                {children}
            </div>
        </div>
    )
)
Banner.displayName = "Banner"

const BannerTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & {variant?: BannerVariant}
>(({className, variant, ...props}, ref) => (
    <p
        ref={ref}
        className={cn(bannerTitleVariants({variant}), className)}
        {...props}
    />
))
BannerTitle.displayName = "BannerTitle"

const BannerDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> & {variant?: BannerVariant}
>(({className, variant, ...props}, ref) => (
    <p
        ref={ref}
        className={cn(bannerDescriptionVariants({variant}), className)}
        {...props}
    />
))
BannerDescription.displayName = "BannerDescription"

const BannerActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn("mt-3 flex flex-wrap items-center gap-2", className)}
        {...props}
    />
))
BannerActions.displayName = "BannerActions"

export {
    Banner,
    BannerTitle,
    BannerDescription,
    BannerActions,
    bannerVariants,
    bannerIconVariants,
    bannerTitleVariants,
    bannerDescriptionVariants,
}
export type {BannerProps}
