"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-pink-200/10 via-white/5 to-purple-200/10 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl">
          ✨
        </div>

        <p className="text-sm font-medium text-white">
          Görsel yakında
        </p>

        <p className="mt-1 max-w-[180px] text-xs text-neutral-400">
          {alt} ürünü için görsel hazırlanıyor.
        </p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition duration-500 hover:scale-105"
      sizes="(max-width: 768px) 100vw, 33vw"
      onError={() => setHasError(true)}
    />
  );
}