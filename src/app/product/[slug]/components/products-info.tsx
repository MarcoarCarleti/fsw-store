"use client";

import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { ProductsWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ProductInfoProps {
  product: ProductsWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isWindow, setWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.screen.width >= 1280) {
      setWindow(true);
    }
  }, []);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity });
    toast.success(`Adicionado ao carrinho`, {
      style: {
        background: "#5033C3",
        color: "white",
      },
      duration: 1000,
    });
  };

  return (
    <div className="flex flex-col px-5  xl:max-h-[670px] xl:rounded-lg xl:bg-accent xl:p-10">
      <h2 className="text-lg xl:text-2xl">{product.name}</h2>

      {isWindow && (
        <div>
          <h1 className="mb-16 text-[#8162FF]">Disponível em estoque</h1>
        </div>
      )}

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold xl:text-[28px]">
          R$ {product.totalPrice.toFixed(2).replace(".", ",")}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm line-through opacity-75 xl:mt-1">
          R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
        </p>
      )}

      <div className="mt-4 flex items-center gap-2 xl:gap-4">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
          className="xl:border-[#2A2A2A] xl:bg-accent xl:hover:border-none xl:hover:bg-background"
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
          className="xl:border-[#2A2A2A] xl:bg-accent xl:hover:border-none xl:hover:bg-background"
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <h3 className="font-bold">Descrição</h3>
        <p className="limit-text text-justify text-sm opacity-60 xl:max-w-[400px]">
          {product.description}
        </p>
      </div>

      <Button
        className="mt-8 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-5 py-2 xl:bg-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <TruckIcon />
          <div className="flex flex-col ">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>
            <p className="text-[#8162FF] text-primary">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        <p className="text-xs font-bold">Frete Grátis</p>
      </div>
      <Toaster />
    </div>
  );
};

export default ProductInfo;
