import { prismaClient } from "@/lib/prisma";
import ProductImages from "./components/products-images";
import ProductInfo from "./components/products-info";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductsList } from "@/components/ui/products-list";

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
    <div className="flex flex-col gap-8 pb-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <ProductsList products={product.category.products} />
    </div>
  );
};

export default ProductDetailsPage;
