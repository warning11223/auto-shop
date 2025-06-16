import { useState, useCallback } from 'react';
import { fetchCars, ICar, IPaginationMeta } from "@/api/fetchCars";

export function useFetchCars() {
    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<IPaginationMeta>();

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

    return {
        cars,
        loading,
        pagination,
        fetchCarsData
    };
}
