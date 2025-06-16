import { Skeletons } from "../Skeletons";
import {Card} from "@/components/Card";
import {ICar} from "@/api/fetchCars";
import React, {FC} from "react";

interface Props {
    loading: boolean;
    cars: ICar[];
}

const CardsComponent: FC<Props> = ({ loading, cars }) => {
    return (
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
    );
};

CardsComponent.displayName = 'Cards';

export const Cards = React.memo(CardsComponent);