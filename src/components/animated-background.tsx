import * as React from "react"
import {cn} from "../lib/utils"

interface AnimatedBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "subtle" | "vibrant" | "dashboard"
    showOrbs?: boolean
    showGrid?: boolean
}

const AnimatedBackground = React.forwardRef<HTMLDivElement, AnimatedBackgroundProps>(
    ({className, variant = "default", showOrbs = true, showGrid = false, children, ...props}, ref) => {
        const isDashboard = variant === "dashboard"

        return (
            <div
                ref={ref}
                className={cn(
                    "relative min-h-screen overflow-hidden",
                    // Light mode backgrounds
                    variant === "default" && "bg-gradient-to-br from-slate-50 via-white to-slate-100",
                    variant === "subtle" && "bg-gradient-to-br from-blue-50/50 via-white to-violet-50/50",
                    variant === "vibrant" && "bg-gradient-to-br from-blue-100 via-white to-violet-100",
                    variant === "dashboard" && "bg-background",
                    // Dark mode backgrounds
                    !isDashboard && "dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
                    className
                )}
                {...props}
            >
                {/* Dashboard mesh gradient */}
                {isDashboard && (
                    <div className="pointer-events-none absolute inset-0 bg-mesh-gradient" />
                )}

                {/* Grid pattern overlay */}
                {showGrid && (
                    <div className="pointer-events-none absolute inset-0 bg-grid-pattern" />
                )}

                {showOrbs && (
                    <>
                        {/* Animated gradient orbs */}
                        <div
                            className={cn(
                                "pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl",
                                isDashboard
                                    ? "-left-32 -top-32 h-64 w-64 from-blue-500/10 to-violet-500/10 dark:from-blue-500/20 dark:to-violet-500/15"
                                    : "-left-40 -top-40 h-80 w-80 from-blue-400/20 to-violet-500/20 dark:from-blue-500/10 dark:to-violet-500/10",
                                "animate-float"
                            )}
                        />
                        <div
                            className={cn(
                                "pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl animate-float",
                                isDashboard
                                    ? "-right-32 top-1/3 h-72 w-72 from-violet-500/10 to-purple-500/10 dark:from-violet-500/15 dark:to-purple-500/10"
                                    : "-right-40 top-1/4 h-96 w-96 from-violet-400/20 to-pink-500/20 dark:from-violet-500/10 dark:to-pink-500/10"
                            )}
                            style={{animationDelay: "-2s"}}
                        />
                        {!isDashboard && (
                            <div
                                className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/15 blur-3xl animate-float dark:from-blue-600/10 dark:to-cyan-500/10"
                                style={{animationDelay: "-4s"}}
                            />
                        )}
                    </>
                )}

                {/* Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        )
    }
)
AnimatedBackground.displayName = "AnimatedBackground"

interface GradientOrbProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: "blue" | "violet" | "pink" | "cyan"
    size?: "sm" | "md" | "lg" | "xl"
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
    blur?: "sm" | "md" | "lg" | "xl"
    animate?: boolean
}

const GradientOrb = React.forwardRef<HTMLDivElement, GradientOrbProps>(
    ({
         className,
         color = "blue",
         size = "md",
         position = "center",
         blur = "lg",
         animate = true,
         ...props
     }, ref) => {
        const colorClasses = {
            blue: "from-blue-400/30 to-blue-600/20 dark:from-blue-500/15 dark:to-blue-700/10",
            violet: "from-violet-400/30 to-violet-500/20 dark:from-violet-500/15 dark:to-violet-600/10",
            pink: "from-pink-400/30 to-pink-600/20 dark:from-pink-500/15 dark:to-pink-700/10",
            cyan: "from-cyan-400/30 to-cyan-600/20 dark:from-cyan-500/15 dark:to-cyan-700/10",
        }

        const sizeClasses = {
            sm: "h-32 w-32",
            md: "h-64 w-64",
            lg: "h-96 w-96",
            xl: "h-[32rem] w-[32rem]",
        }

        const positionClasses = {
            "top-left": "-left-20 -top-20",
            "top-right": "-right-20 -top-20",
            "bottom-left": "-left-20 -bottom-20",
            "bottom-right": "-right-20 -bottom-20",
            "center": "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        }

        const blurClasses = {
            sm: "blur-xl",
            md: "blur-2xl",
            lg: "blur-3xl",
            xl: "blur-[100px]",
        }

        return (
            <div
                ref={ref}
                className={cn(
                    "pointer-events-none absolute rounded-full bg-gradient-to-br",
                    colorClasses[color],
                    sizeClasses[size],
                    positionClasses[position],
                    blurClasses[blur],
                    animate && "animate-float",
                    className
                )}
                {...props}
            />
        )
    }
)
GradientOrb.displayName = "GradientOrb"

export {AnimatedBackground, GradientOrb}
