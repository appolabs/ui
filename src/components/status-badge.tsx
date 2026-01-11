import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "../lib/utils"

const statusBadgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
    {
        variants: {
            status: {
                pending:
                    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
                new:
                    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                ready:
                    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                completed:
                    "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400",
                not_published:
                    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
                waiting_publication:
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                published:
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
                waiting_deletion:
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
            },
        },
        defaultVariants: {
            status: "pending",
        },
    }
)

const statusLabels: Record<string, string> = {
    pending: "In preparazione",
    new: "Creata",
    ready: "Pronta",
    completed: "Completata",
    not_published: "Not Published",
    waiting_publication: "Publishing...",
    published: "Published",
    waiting_deletion: "Deleting...",
}

const statusIcons: Record<string, React.ReactNode> = {
    pending: (
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
    ),
    new: (
        <span className="inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
    ),
    ready: (
        <span className="inline-flex rounded-full h-2 w-2 bg-green-500"></span>
    ),
    completed: (
        <span className="inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
    ),
    not_published: (
        <span className="inline-flex rounded-full h-2 w-2 bg-gray-400"></span>
    ),
    waiting_publication: (
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
        </span>
    ),
    published: (
        <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    ),
    waiting_deletion: (
        <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
    ),
}

export interface StatusBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof statusBadgeVariants> {
    showIcon?: boolean
    label?: string
}

function StatusBadge({
    className,
    status,
    showIcon = true,
    label,
    ...props
}: StatusBadgeProps) {
    const statusKey = status || "pending"
    const displayLabel = label || statusLabels[statusKey] || statusKey

    return (
        <div
            className={cn(statusBadgeVariants({status}), className)}
            {...props}
        >
            {showIcon && statusIcons[statusKey]}
            <span>{displayLabel}</span>
        </div>
    )
}

export {StatusBadge, statusBadgeVariants, statusLabels}
