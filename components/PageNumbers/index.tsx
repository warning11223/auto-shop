import React, {FC, useMemo} from 'react';
import {IPaginationMeta} from "@/api/fetchCars";
import {useWindowWidth} from "@/shared/hooks/useWindowWidth";

interface Props {
    pagination: IPaginationMeta;
    handlePageChange: (page: number) => void;
    currentPage: number;
}

export const PageNumbers: FC<Props> = ({ pagination, currentPage, handlePageChange }) => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 640;

    const generatePageNumbers = useMemo(() => {
        const totalPages = pagination?.last_page || 1;
        const pages: (number | string)[] = [];
        const maxPagesToShow = isMobile ? 1 : 5;

        const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, currentPage + Math.floor(maxPagesToShow / 2));

        if (startPage > 1) pages.push(1);
        if (startPage > 2 && !isMobile) pages.push("...");

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1 && !isMobile) pages.push("...");
        if (endPage < totalPages) pages.push(totalPages);

        return pages;
    }, [currentPage, pagination, isMobile]);

    return (
        <div className="flex items-center space-x-2">
            {generatePageNumbers.map((page, index) => {
                if (page === "...") {
                    return (
                        <span key={index} className="px-3 py-2 text-gray-500">
                                {page}
                            </span>
                    );
                }
                return (
                    <button
                        key={index}
                        className={`px-4 py-2 rounded-full transition duration-200 ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-100'}`}
                        onClick={() => handlePageChange(+page)}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};