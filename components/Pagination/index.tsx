import { useRouter } from 'next/navigation';
import { IPaginationMeta } from "@/api/fetchCars";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {PageNumbers} from "@/components/PageNumbers";
import {useCallback} from "react";

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
    const router = useRouter();

    const isPrevPageDisabled = !pagination?.prev_page_link;
    const isNextPageDisabled = !pagination?.next_page_link;

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', page.toString());
        if (sortParams) {
            queryParams.set('sort', new URLSearchParams(sortParams).get('_sort') || '');
        }

        router.push(`${window.location.pathname}?${queryParams.toString()}`);
    }, [setCurrentPage, sortParams, router]);

    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                disabled={isPrevPageDisabled}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft />
            </button>

            <PageNumbers
                pagination={pagination}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
            />

            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                disabled={isNextPageDisabled}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <ChevronRight />
            </button>
        </div>
    );
};
