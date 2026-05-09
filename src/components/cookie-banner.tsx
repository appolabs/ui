import * as React from 'react';
import { cn } from '../lib/utils';
import { Button } from './button';

export interface CookieBannerProps {
    visible: boolean;
    cookiePolicyUrl: string;
    onAccept: () => void;
    onReject: () => void;
    onManage?: () => void;
    className?: string;
}

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
        <div className={cn('fixed bottom-0 left-0 right-0 z-50 p-4', className)}>
            <div className="rounded-xl border border-border bg-card/95 backdrop-blur-sm flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                    Utilizziamo i cookie per migliorare la tua esperienza.{' '}
                    <a
                        href={cookiePolicyUrl}
                        className="text-foreground underline underline-offset-2 hover:no-underline"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Cookie policy
                    </a>
                </p>
                <div className="flex shrink-0 items-center gap-2">
                    {onManage && (
                        <Button variant="ghost" size="sm" onClick={onManage} className="hover:bg-transparent hover:underline">
                            Gestisci
                        </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={onReject}>
                        Rifiuta
                    </Button>
                    <Button size="sm" onClick={onAccept}>
                        Accetta tutto
                    </Button>
                </div>
            </div>
        </div>
    );
}
