import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductsList } from "../../components/ui/products-list";
import { SectionTitle } from "../../components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";
import Link from "next/link";

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
    <div className="flex flex-col gap-8 py-8">
      <Link href="/deals">
        <PromoBanner
          src="/banner-discount.png"
          alt="Até 55% de desconto esse mês"
        />
      </Link>
      <div className=" px-5">
        <Categories />
      </div>

      <div>
        <SectionTitle>
          <Link href="/deals">Ofertas</Link>
        </SectionTitle>
        <ProductsList products={deals} />
      </div>

      <Link href="/category/mouses">
        <PromoBanner
          src="/banner-mouses.png"
          alt="Até 55% de desconto em mouses"
        />
      </Link>

      <div>
        <SectionTitle>
          <Link href="/category/keyboards">Teclados</Link>
        </SectionTitle>
        <ProductsList products={keyboards} />
      </div>

      <div>
        <Link href="/category/headphones">
          <PromoBanner
            src="/banner-fones.png"
            alt="Até 20% de desconto em Fones"
          />
        </Link>
      </div>

      <div>
        <SectionTitle>
          <Link href="/category/mouses">Mouses</Link>
        </SectionTitle>
        <ProductsList products={mouses} />
      </div>
    </div>
  );
}
