import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export function PromoBanner({alt, className, ...props}: ImageProps) {
  return (
    <Image
      height={0}
      width={0}
      className={twMerge("h-auto w-full px-5", className)}
      sizes="100vw"
      alt={alt}
      {...props}
    />
  );
}
