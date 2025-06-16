import Link from "next/link";
import React, {FC, useMemo} from 'react';
import {Youtube} from "lucide-react";
import {ICar} from "@/api/fetchCars";
import CarSlider from "@/components/CardSlider";

interface Props {
    car: ICar
}

export const Card: FC<Props> = ({car}) => {
    const formattedPrice = useMemo(() => car.price.toLocaleString('ru-RU'), [car.price]);
    const formattedRun = useMemo(() => car.run.toLocaleString('ru-RU'), [car.run]);

    return (
        <div className="relative border border-gray-300 rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <p className="text-2xl font-semibold text-center mb-4 text-gray-600">{formattedPrice} ₽</p>

            <CarSlider images={car.images.image}/>

            <p className="text-gray-700 text-xl overflow-hidden text-ellipsis whitespace-nowrap">
                {car.mark_id} {car.folder_id} {car.modification_id}
            </p>
            <p className="text-gray-500 text-xl">{car.year} / {formattedRun} км</p>
            {car?.video && (
                <Link target="_blank" href={car.video} className="absolute right-4 bottom-4 w-[max-content]">
                    <Youtube className="text-red-500" size={32}/>
                </Link>
            )}
        </div>
    );
};