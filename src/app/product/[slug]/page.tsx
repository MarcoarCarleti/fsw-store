import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/products-images";
import ProductInfo from "./components/products-info";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductsList } from "@/components/ui/products-list";
import { SectionTitle } from "@/components/ui/section-title";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

const ProductDetailsPage = async ({
  params: { slug },
}: ProductDetailsPageProps) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="flex flex-col gap-8 pb-8 xl:mt-10 xl:px-24 xl:pb-8 ">
      <div className="xl:flex xl:flex-row xl:justify-center xl:gap-8">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo product={computeProductTotalPrice(product)} />
      </div>

      <div className="xl:ml-[212px] xl:mt-20">
        <SectionTitle> Produtos Recomendados</SectionTitle>
        <ProductsList products={product.category.products} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
