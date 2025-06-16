import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

export function useUrlParams() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

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

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>, setSortOption: React.Dispatch<React.SetStateAction<string>>, setSortParams: React.Dispatch<React.SetStateAction<string>>) => {
        const value = event.target.value;
        setSortOption(value);
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

    return {
        computedSortParams,
        handleSortChange
    };
}
