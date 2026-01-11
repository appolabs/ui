import React from 'react';
import { Button } from './button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showInfo?: boolean;
    totalItems?: number;
    itemsPerPage?: number;
    className?: string;
}

export function Pagination({
                               currentPage,
                               totalPages,
                               onPageChange,
                               showInfo = false,
                               totalItems = 0,
                               itemsPerPage = 10,
                               className
                           }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {showInfo && totalItems > 0 && (
                <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startItem}</span> - <span
                    className="font-medium">{endItem}</span> di{' '}
                    <span className="font-medium">{totalItems}</span> risultati
                </div>
            )}

            <div className="flex items-center justify-center gap-1">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 w-9 p-0"
                >
                    <ChevronLeft className="h-4 w-4"/>
                </Button>

                {/* Page Numbers */}
                {getVisiblePages().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === 'ellipsis' ? (
                            <div className="flex h-9 w-9 items-center justify-center">
                                <MoreHorizontal className="h-4 w-4 text-gray-400"/>
                            </div>
                        ) : (
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page as number)}
                                className="h-9 w-9 p-0"
                            >
                                {page}
                            </Button>
                        )}
                    </React.Fragment>
                ))}

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 w-9 p-0"
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
        </div>
    );
}
