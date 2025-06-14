export interface ICar {
    mark_id: string;
    folder_id: string;
    modification_id: string;
    run: number;
    year: number;
    price: number;
    images: {
        image: string[];
    }
    video: string;
}

export interface IPaginationMeta {
    limit: number;
    page: number | null;
    total_no_filters: number;
    count: number;
    total: number;
    last_page: number;
    first_page_link?: string;
    last_page_link?: string;
    prev_page_link?: string;
    next_page_link?: string;
}

interface IFetchCarsResponse {
    data: ICar[];
    meta: IPaginationMeta;
}

type IFetchCarsResult = IFetchCarsResponse | { error: string };

// Функция для получения данных
export async function fetchCars(pageUrl: string): Promise<IFetchCarsResult> {
    try {
        const res = await fetch(pageUrl);

        if (!res.ok) {
            throw new Error(`Ошибка: ${res.status} - ${res.statusText}`);
        }

        const data: IFetchCarsResponse = await res.json();
        return data;
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        return { error: error instanceof Error ? error.message : "Неизвестная ошибка" };
    }
}
