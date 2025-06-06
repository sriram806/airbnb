'use client';

import Image from "next/image";

function Avatar() {
  return (
    <div>
      <Image
        alt="Avatar"
        className="rounded-full"
        height="30"
        width="30"
        src="/images/placeholder.webp"
      />
    </div>
  )
}

export default Avatar