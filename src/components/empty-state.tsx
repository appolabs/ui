import * as React from "react"

import {cn} from "../lib/utils"

export interface EmptyStateProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    icon?: React.ReactNode
    title: string
    description?: string
    action?: React.ReactNode
}

function EmptyState({
    icon,
    title,
    description,
    action,
    className,
    ...props
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-3 rounded-lg border bg-card p-10 text-center",
                className
            )}
            {...props}
        >
            {icon && <div className="text-muted-foreground">{icon}</div>}
            <p className="font-medium">{title}</p>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
            {action && <div className="pt-2">{action}</div>}
        </div>
    )
}

export {EmptyState}
