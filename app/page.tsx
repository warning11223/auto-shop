'use client'

import {Cards} from "@/components/Cards";
import React, {useState, useEffect} from "react";
import {SelectSort} from "@/components/SelectSort";
import { Pagination } from "@/components/Pagination";
import {IPaginationMeta} from "@/api/fetchCars";
import { useSearchParams } from 'next/navigation';
import {useFetchCars} from "@/shared/hooks/useFetchCars";
import {useUrlParams} from "@/shared/hooks/useUrlParams";
import 'react-loading-skeleton/dist/skeleton.css';

export default function Home() {
    const [sortOption, setSortOption] = useState<string>('default');
    const [sortParams, setSortParams] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const searchParams = useSearchParams();

    const { cars, loading, pagination, fetchCarsData } = useFetchCars();
    const { computedSortParams, handleSortChange } = useUrlParams();

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
                    handleSortChange={(e) => handleSortChange(e, setSortOption, setSortParams)}
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
