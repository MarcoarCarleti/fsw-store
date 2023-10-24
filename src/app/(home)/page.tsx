import { Categories } from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import { ProductsList } from "../../components/ui/products-list";
import { SectionTitle } from "../../components/ui/section-title";
import { PromoBanner } from "./components/promo-banner";
import BannerDiscount from "@/../public/banner-discount.png";
import BannerDiscountDesk from "@/../public/banner-discount-desk.svg";
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
    <div className="flex flex-col gap-8 py-8 xl:py-0">
      <Link href="/deals">
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet="/banner-discount-desk.svg"
          />
          <PromoBanner
            src="/banner-discount.png"
            alt="Até 55% de desconto esse mês"
            className="xl:h-[] xl:w-full xl:p-0"
          />
        </picture>
      </Link>

      <div className="xl:px-24 2xl:px-64">
        <div className="px-5">
          <Categories />
        </div>

        <div className="my-7 xl:my-10 xl:px-6 ">
          <SectionTitle>
            <Link href="/deals">Ofertas</Link>
          </SectionTitle>
          <ProductsList products={deals} />
        </div>

        <div className="xl:flex xl:items-center xl:justify-center">
          <Link href="/category/mouses" className="xl:flex">
            <picture>
              <source media="(min-width: 1280px)" srcSet="/banner-mouses.png" />
              <PromoBanner
                src="/banner-mouses.png"
                alt="Até 55% de desconto em mouses"
                className="xl:h-[215] xl:w-[675px]"
              />
            </picture>
          </Link>

          <Link href="/category/headphones">
            <picture>
              <source media="(min-width: 1280px)" srcSet="/banner-fones.png" />
              <PromoBanner
                src={""}
                alt=""
                className="xl:h-[215] xl:w-[675px]"
              />
            </picture>
          </Link>
        </div>

        <div className="my-7 xl:my-10 xl:px-6 ">
          <SectionTitle>
            <Link href="/category/keyboards">Teclados</Link>
          </SectionTitle>
          <ProductsList products={keyboards} />
        </div>

        <div>
          <Link href="/category/headphones">
            <picture className="flex justify-center">
              <source
                media="(min-width: 1280px)"
                srcSet="/banner-frete-gratis.svg"
              />

              <PromoBanner
                src="/banner-fones.png"
                alt="Até 20% de desconto em Fones"
                className="xl:w-[1350px]"
              />
            </picture>
          </Link>
        </div>

        <div className="my-7 xl:my-10 xl:px-6 ">
          <SectionTitle>
            <Link href="/category/mouses">Mouses</Link>
          </SectionTitle>
          <ProductsList products={mouses} />
        </div>
      </div>
    </div>
  );
}
