'use client'

import {Cards} from "@/components/Cards";
import React, {useState, useEffect, useCallback, useMemo} from "react";
import {SelectSort} from "@/components/SelectSort";
import { Pagination } from "@/components/Pagination";
import {fetchCars, ICar, IPaginationMeta} from "@/api/fetchCars";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<IPaginationMeta>();
    const [sortOption, setSortOption] = useState<string>('default');
    const [sortParams, setSortParams] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const fetchCarsData = useCallback(async (pageUrl: string) => {
        setLoading(true);
        const response = await fetchCars(pageUrl);

        if ('error' in response) {
            console.error(response.error);
        } else {
            setCars(response.data);
            setPagination(response.meta);
        }

        setLoading(false);
    }, []);

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortOption(value);
        setCurrentPage(1);

        const sortMap: { [key: string]: string } = {
            'sort=price&order=asc': '&_sort=price&_order=asc',
            'sort=price&order=desc': '&_sort=price&_order=desc',
        };

        const newSortParams = sortMap[value] || '';
        setSortParams(newSortParams);

        if (value !== 'default') {
            router.push(`${pathname}?${value}&page=1`);
        } else {
            router.push(pathname);
        }
    };

    const computedSortParams = useMemo(() => {
        const sort = searchParams.get('sort');
        const order = searchParams.get('order');
        const page = searchParams.get('page');
        const sortParams = (sort && order)
            ? `&_sort=${sort}&_order=${order}`
            : (sort ? `&_sort=${sort}`
                : (order ? `_order=${order}` : ''));

        return {
            sortParams,
            currentPage: page ? parseInt(page, 10) : 1
        };
    }, [searchParams]);

    // Чтение параметров из URL при монтировании компонента
    useEffect(() => {
        setSortOption(`sort=${searchParams.get('sort')}&order=${searchParams.get('order')}`);
        setCurrentPage(computedSortParams.currentPage);
        fetchCarsData(`/api/cars?_limit=12&_page=${computedSortParams.currentPage}${computedSortParams.sortParams}`);
    }, [computedSortParams, fetchCarsData]);


    return (
        <div className="flex justify-center items-center h-full py-8 bg-gray-100">
            <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <SelectSort
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                />

                <Cards
                    loading={loading}
                    cars={cars}
                />

                <Pagination
                    pagination={pagination as IPaginationMeta}
                    sortParams={sortParams}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}
