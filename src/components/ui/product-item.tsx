import { ProductsWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDown } from "lucide-react";

interface ProductItemProps {
  product: ProductsWithTotalPrice;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className=" relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: "contain" }}
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-[2px]">
            <ArrowDown size={14} /> {product.discountPercentage} %
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>

        <div className="flex items-center gap-2 ">
          {product.discountPercentage > 0 ? (
            <>
              <p className="  overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                R$ {product.totalPrice.toFixed(2).replace(".", ",")}
              </p>

              <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            </>
          ) : (
            <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
              R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
