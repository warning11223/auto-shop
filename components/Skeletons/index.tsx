import Skeleton from "react-loading-skeleton";

export const Skeletons = () => {
    return (
        [...Array(12)].map((_, index) => (
            <div key={index} className="relative border border-gray-300 rounded-lg p-4 sm:p-6 shadow-lg">
                <Skeleton height={32} width="100%" className="mb-4" />
                <Skeleton width="100%" className="h-[140px] md:h-[240px]" />
                <Skeleton height={28} width="70%" className="mt-4" />
                <Skeleton height={28} width="40% mt-4" className="mt-2" />
            </div>
        ))
    );
};