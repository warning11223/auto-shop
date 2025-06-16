'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
    images: string[];
}

export default function CarSlider({ images }: Props) {
    const [loading, setLoading] = useState(true);

    const limitedImages = useMemo(() => images.slice(0, 12), [images]);

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
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-[150px] md:h-[250px]">
                            {loading && (
                                <Skeleton height="100%" width="100%"/>
                            )}
                            <Image
                                id={`img-${idx}`}
                                src={img}
                                alt={`Car image ${idx}`}
                                className={`w-full h-full object-cover rounded-lg cursor-pointer transition-opacity duration-300`}
                                layout="fill"
                                onLoad={() => setLoading(false)}
                                style={{opacity: loading ? '0' : '1'}}
                            />
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
