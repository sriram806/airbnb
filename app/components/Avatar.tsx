'use client';

import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

function Avatar({ src }: AvatarProps) {
  const imageSrc = src ;

  return (
    <div className="w-[30px] h-[30px] relative">
      <Image
        alt="Avatar"
        className="rounded-full object-cover"
        fill
        src={imageSrc}
      />
    </div>
  );
}

export default Avatar;
