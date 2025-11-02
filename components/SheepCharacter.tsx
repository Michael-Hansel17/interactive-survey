import React from "react";
import Image from "next/image";

type Props = {
    className?: string;
};

const SheepCharacter: React.FC<Props> = ({ className }) => {
    return (
        <div
            className="w-[180px] sm:w-[220px] md:w-[280px] lg:w-[320px] max-w-full self-center"
            aria-hidden="true"
        >
            <Image
                src="/sheep.svg"
                width={500}
                height={500}
                alt="Picture of Sheep Character"
                priority
                // biar skala rapi di semua device
                className="w-full h-auto object-contain select-none pointer-events-none"
                // hint untuk browser: ukuran kira-kira per breakpoint
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 280px, 320px"
            />
        </div>
    );
};

export default SheepCharacter;
