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

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });
  return (
    <div className="flex flex-col gap-8">
      <PromoBanner
        src="/banner-discount.png"
        alt="Até 55% de desconto esse mês"
      />
      <div className=" px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductsList products={deals} />
      </div>

      <PromoBanner
        src="/banner-mouses.png"
        alt="Até 55% de desconto em mouses"
      />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductsList products={keyboards} />
      </div>

      <div>
        <PromoBanner
          src="/banner-fones.png"
          alt="Até 20% de desconto em Fones"
        />
      </div>

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductsList products={mouses} />
      </div>
    </div>
  );
}
