import { cn } from '../lib/utils';

export interface CookieBannerProps {
    visible: boolean;
    cookiePolicyUrl: string;
    onAccept: () => void;
    onReject: () => void;
    onManage?: () => void;
    className?: string;
}

/**
 * Brand-fixed cookie consent banner. Reads as a sibling system bar to the
 * site/app topbar: translucent `bg-white/5` + `backdrop-blur-md` over the
 * page's own background. Card design is the canonical Appo design-system
 * "glass card" — match this treatment in any new card-like surfaces.
 *
 * If you need a different visual for a future product, do not add a variant
 * prop to this component — duplicate it under a different name.
 */
export function CookieBanner({
    visible,
    cookiePolicyUrl,
    onAccept,
    onReject,
    onManage,
    className,
}: CookieBannerProps) {
    if (!visible) return null;

    return (
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 sm:py-4 sm:px-4 md:px-6 lg:px-8', className)}>
            <div className="sm:max-w-7xl sm:mx-auto">
                <div className="border border-white/10 bg-white/5 backdrop-blur-md flex flex-col gap-4 px-4 py-3 sm:rounded-xl sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/60">
                        Utilizziamo i cookie per migliorare la tua esperienza.{' '}
                        <a
                            href={cookiePolicyUrl}
                            className="text-white underline underline-offset-2 hover:no-underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Cookie policy
                        </a>
                    </p>
                    <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                        {onManage && (
                            <button
                                type="button"
                                onClick={onManage}
                                className="h-9 cursor-pointer rounded-md px-3 text-sm text-white/60 transition-colors hover:underline"
                            >
                                Gestisci
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onReject}
                            className="h-9 cursor-pointer rounded-xl border border-white/20 px-3 text-sm text-white/70 transition-colors hover:bg-white/10"
                        >
                            Rifiuta
                        </button>
                        <button
                            type="button"
                            onClick={onAccept}
                            className="h-9 cursor-pointer rounded-xl bg-gradient-to-r from-[#8a9eff] to-[#5e77cc] px-3 text-sm font-medium text-white transition-all hover:from-[#7a8eef] hover:to-[#4e67bc]"
                        >
                            Accetta tutto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
