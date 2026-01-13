import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "../lib/utils"

const glassTabsContainerVariants = cva(
    "flex gap-1 rounded-lg bg-glass-subtle p-1 backdrop-blur-glass",
    {
        variants: {
            size: {
                sm: "p-0.5",
                default: "p-1",
                lg: "p-1.5",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

const glassTabVariants = cva(
    "flex items-center justify-center rounded-md font-medium transition-all",
    {
        variants: {
            size: {
                sm: "px-3 py-1.5 text-xs",
                default: "px-4 py-2.5 text-sm",
                lg: "px-5 py-3 text-base",
            },
            state: {
                active: "bg-glass text-glass-foreground shadow-sm",
                inactive: "text-glass-foreground-muted hover:text-glass-foreground",
            },
        },
        defaultVariants: {
            size: "default",
            state: "inactive",
        },
    }
)

export interface TabItem {
    id: string
    label: string
    icon?: React.ReactNode
    disabled?: boolean
}

export interface GlassTabsProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
        VariantProps<typeof glassTabsContainerVariants> {
    tabs: TabItem[]
    activeTab: string
    onTabChange: (id: string) => void
}

const GlassTabs = React.forwardRef<HTMLDivElement, GlassTabsProps>(
    ({className, tabs, activeTab, onTabChange, size, ...props}, ref) => {
        return (
            <div
                ref={ref}
                role="tablist"
                className={cn(glassTabsContainerVariants({size, className}))}
                {...props}
            >
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        role="tab"
                        type="button"
                        aria-selected={activeTab === tab.id}
                        aria-disabled={tab.disabled}
                        disabled={tab.disabled}
                        onClick={() => !tab.disabled && onTabChange(tab.id)}
                        className={cn(
                            glassTabVariants({
                                size,
                                state: activeTab === tab.id ? "active" : "inactive",
                            }),
                            "flex-1",
                            tab.disabled && "cursor-not-allowed opacity-50"
                        )}
                    >
                        {tab.icon && <span className="mr-2">{tab.icon}</span>}
                        {tab.label}
                    </button>
                ))}
            </div>
        )
    }
)
GlassTabs.displayName = "GlassTabs"

export {GlassTabs, glassTabsContainerVariants, glassTabVariants}
