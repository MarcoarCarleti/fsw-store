import { ProductsWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: ProductsWithTotalPrice;
  className?: string;
}

export function ProductItem({ product, className }: ProductItemProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn(
        "flex min-w-[156px] flex-col gap-4 xl:min-h-[190px] xl:min-w-[180px]",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className=" relative flex h-[170px] xl:h-[190px] w-full items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
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
    </Link>
  );
}
