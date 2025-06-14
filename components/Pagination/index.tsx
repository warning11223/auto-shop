import { useRouter } from 'next/navigation';
import {IPaginationMeta} from "@/api/fetchCars";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {useWindowWidth} from "@/shared/hooks/useWindowWidth";

interface Props {
    pagination: IPaginationMeta;
    sortParams: string;
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

export const Pagination = ({
                               pagination,
                               sortParams,
                               setCurrentPage,
                               currentPage
                           }: Props) => {
    const windowWidth = useWindowWidth();
    const router = useRouter();

    const isMobile = windowWidth <= 640;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        // Обновляем URL с новым номером страницы
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('page', page.toString());
        if (sortParams) {
            newUrl.searchParams.set('sort', new URLSearchParams(sortParams).get('_sort') || '');
        }

        router.push(newUrl.toString());
    };

    const generatePageNumbers = () => {
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
    };

    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                disabled={!pagination?.prev_page_link}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft />
            </button>

            <div className="flex items-center space-x-2">
                {generatePageNumbers().map((page, index) => {
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

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                disabled={!pagination?.next_page_link}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronRight />
            </button>
        </div>
    );
};
