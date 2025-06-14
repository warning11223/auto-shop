'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

type Props = {
    images: string[]
}

export default function CarSlider({ images }: Props) {
    const limitedImages = images.slice(0, 12);

    return (
        <div className="mb-4">
            <Swiper
                className="rounded-lg"
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                modules={[Navigation, Pagination]}
            >
                {limitedImages.map((img, idx) => (
                    <SwiperSlide key={idx} className="xl:min-h-[250px]">
                        <Image
                            src={img}
                            alt={`Car image ${idx}`}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            width={500}
                            height={300}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
