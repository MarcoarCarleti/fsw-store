import Image from "next/image";
import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductsList } from "./components/products-list";
import { SectionTitle } from "./components/section-title";
import { PromoBanner } from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });
  return (
    <div className="">
      <PromoBanner
        src="/banner-discount.png"
        alt="Até 55% de desconto esse mês"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductsList products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="Até 50% de desconto em mouses"
      />

      <div className="mt-8">
        <SectionTitle>Teclados</SectionTitle>
        <ProductsList products={keyboards} />
      </div>
    </div>
  );
}
