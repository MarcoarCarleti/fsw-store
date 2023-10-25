"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ imageUrls, name }: ProductImagesProps) => {
  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  const [currentImage, setCurrentImage] = useState(imageUrls[0]);
  return (
    <div className="flex flex-col xl:relative">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent xl:relative xl:h-[670px] xl:w-[736px] xl:rounded-lg">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] "
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="my-8 grid grid-cols-4 gap-4 px-5 xl:absolute xl:left-4 xl:top-4 xl:flex xl:flex-col">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent xl:h-[77px] xl:w-[77px] xl:bg-[#0B0B0B]
                ${
                  imageUrl === currentImage &&
                  "border-2 border-solid border-primary"
                }
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] xl:rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
