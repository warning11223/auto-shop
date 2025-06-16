import React, { FC } from "react";

interface Props {
    sortOption: string;
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectSortComponent: FC<Props> = ({ sortOption, handleSortChange }) => {
    return (
        <div className="mb-6 text-right">
            <label htmlFor="sort" className="mr-2 text-lg font-semibold text-gray-700">Сортировать по:</label>
            <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition duration-150 ease-in-out hover:bg-gray-50"
                aria-live="polite"
            >
                <optgroup label="По умолчанию">
                    <option value="default" className="text-gray-700">По умолчанию</option>
                </optgroup>
                <optgroup label="Сортировка по цене">
                    <option value="sort=price&order=asc" className="text-gray-700">Цена по возрастанию</option>
                    <option value="sort=price&order=desc" className="text-gray-700">Цена по убыванию</option>
                </optgroup>
            </select>
        </div>
    );
};

SelectSortComponent.displayName = "SelectSort";

export const SelectSort = React.memo(SelectSortComponent);
