import Image from "next/image";
import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductsList } from "./components/products-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="">
      <Image
        src="/banner-discount.png"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="Até 55% de desconto esse mês"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <p className="mb-2 pl-5 font-semibold uppercase">Ofertas</p>
        <ProductsList products={deals} />
      </div>

      <Image
        src="/banner-mouses.png"
        height={0}
        width={0}
        className="h-auto w-full px-5"
        sizes="100vw"
        alt="Até 50% de desconto em mouses"
      />
    </div>
  );
}
