'use client'

import { Card } from "@/components/Card";
import {Skeletons} from "@/components/Skeletons";
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useState, useEffect } from "react";
import {SelectSort} from "@/components/SelectSort";
import { Pagination } from "@/components/Pagination";
import {fetchCars, ICar, IPaginationMeta} from "@/api/fetchCars";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

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

    const fetchCarsData = async (pageUrl: string) => {
        setLoading(true);
        const response = await fetchCars(pageUrl);

        if ('error' in response) {
            console.error(response.error);
        } else {
            setCars(response.data);
            setPagination(response.meta);
        }

        setLoading(false);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSortOption(value);
        setCurrentPage(1);

        // Формируем новый URL с параметрами сортировки
        let sortParams = '';
        if (value === 'sort=price&order=asc') {
            sortParams = '&_sort=price&_order=asc';
        } else if (value === 'sort=price&order=desc') {
            sortParams = '&_sort=price&_order=desc';
        }

        // Обновляем URL с новым параметром сортировки
        if (value !== 'default') {
            router.push(`${pathname}?${value}&page=1`);
        } else {
            router.push(pathname);
        }

        setSortParams(sortParams);
    };

    // Чтение параметров из URL при монтировании компонента
    useEffect(() => {
        const sort = searchParams.get('sort');
        const order = searchParams.get('order');
        const page = searchParams.get('page');
        const sortParams = (sort && order)
            ? `&_sort=${sort}&_order=${order}`
            : (sort ? `&_sort=${sort}`
            : (order ? `_order=${order}`
            : ''));

        if (sort) {
            setSortOption(`sort=${sort}&order=${order}`);
        }

        if (page) {
            setCurrentPage(parseInt(page, 10));
        }

        fetchCarsData(`/api/cars?_limit=12&_page=${page || 1}${sortParams}`);
    }, [searchParams]);

    return (
        <div className="flex justify-center items-center h-full py-8 bg-gray-100">
            <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
                <SelectSort
                    sortOption={sortOption}
                    handleSortChange={handleSortChange}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 xl:gap-8">
                    {loading ? (
                        <Skeletons />
                    ) : (
                        cars?.length > 0 ? (
                            cars.map((car, index) => (
                                <Card key={index} car={car} />
                            ))
                        ) : (
                            <div>Нет данных.</div>
                        )
                    )}
                </div>

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
